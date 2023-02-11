import supertest from 'supertest';
import storeApp from '../../index';
import { UserModel, User } from '../../store_models/user';
import { ProductModel, Product } from '../../store_models/product';
const orderTester = supertest(storeApp);
let userToken = "";
let oid = 0;
let userId = 0;

const orderUser: User = {
    firstName: "test",
    lastName: "orders",
    userName: "to01",
    password: "to123"
   };
   const userModel = new UserModel();
   const productModel = new ProductModel();
   let s20: Product;
   let iphone13: Product;

describe('Test orders handler', () => {
    beforeAll(async () => {         
        await userModel.create(orderUser);
        s20 = await productModel.create(
            {
                "productName": "s20",
                "productPrice": 1000,
                "productCategory": "smartPhone"
            }
        );
                
        iphone13 = await productModel.create(
            {
                "productName": "iphone 13",
                "productPrice": 5000,
                "productCategory": "smartPhone"
            }
        );
    });

    
    
    it('test /api/orders => login to retrive token', async () => {
        const response = await orderTester.post('/api/login')
        .set('Content-type', 'application/json')
        .send(orderUser);
        expect(response.status).toBe(200);
        const {token, user} = JSON.parse(response.text);
        userId = user.id;
        userToken = token; 
    });

    it('test /api/orders create => place order', async () => {

        const s20Totalprice = 5 * s20.productPrice;
        const iphone13Totalprice = 2 * iphone13.productPrice;
        const totalPrice = s20Totalprice + iphone13Totalprice;

        const response = await orderTester.post('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
            "userId": userId,
            "oderStatus": "Active",
            "totalPrice": totalPrice,
            "products" : [
                {
                    "productId": s20.id,
                    "quantity": 5,
                    "totalPrice": s20Totalprice
                },
                {
                    "productId": iphone13.id,
                    "quantity": 2,
                    "totalPrice": iphone13Totalprice
                }
            ]        
        }
        );

        expect(response.status).toBe(200);
        const order = JSON.parse(response.text);
        oid = order.id;
        expect(order.id).toBeGreaterThanOrEqual(1);
    });
    
    it('test /api/orders index => list of all orders', async () => {
        const response = await orderTester.get('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        const orders = JSON.parse(response.text);
        expect(orders[0].id).toBeGreaterThanOrEqual(1);        
    });
    
    it('test /api/users show => retrive order by id', async () => {
        const response = await orderTester.get(`/api/orders/${oid}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        const order = JSON.parse(response.text);
        expect(order.userId).toEqual(userId);
    });


    it('test /api/users show => retrive order by user', async () => {
        const response = await orderTester.get(`/api/orders?userId=${userId}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        const orders = JSON.parse(response.text);
        expect(orders[0].id).toBeGreaterThanOrEqual(1);
    });
   
});
