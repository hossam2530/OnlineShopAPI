import {OrderModel, Order} from '../../store_models/order';
import {UserModel, User} from '../../store_models/user';
import {ProductModel, Product} from '../../store_models/product';
import { OrderProducts } from '../../store_models/orderProducts';

let usr: User ={
    firstName: "",
    lastName: "",
    userName: "",
    password:""    
};

let p01: Product ={
        productName: "coffee",
        productPrice: 20,
        productCategory: "drinks"    
};

let op: OrderProducts;
let testOrder: Order;

const productModel = new ProductModel();
const userModel = new UserModel();
const orderModel = new OrderModel();

describe('Test product model', () => {
    beforeAll(async () =>{
        usr = await userModel.create(usr);
        p01 = await productModel.create(p01);
        op = {
            productId: p01.id as number,
            productName: p01.productName,
            quantity: 2,         
            totalPrice: 2 * p01.productPrice
        };

        testOrder = {
            userId: usr.id as number,
            oderStatus: "Active",
            products: [op],
            totalPrice: op.totalPrice    
        }
    });

    it('test create order => id should be returned', async () => {
        testOrder = await orderModel.create(testOrder);
        expect(testOrder.id).toBeGreaterThanOrEqual(1);
    });

    it('test index orders => be sure testorder founded in the list', async () => {
        const olist: Order[] = await orderModel.index();
        expect(olist.length).toBeGreaterThanOrEqual(1);
        // we use let because value will be changed every loop
        let cOrder: Order ;
        let founded = false;
        for(let i = 0;  i < olist.length; i++){
             cOrder = olist[i];
             if(cOrder.id == testOrder.id){
                founded = true;
                break;
             }
        }
        expect(founded).toBeTrue;    
    });
    
    it('test show order => should match testOrder values', async () => {
        const order =await orderModel.show(testOrder.id as number);
        expect(order.totalPrice).toEqual(testOrder.totalPrice);
        expect(order.oderStatus).toEqual(testOrder.oderStatus);
        expect(order.userId).toEqual(testOrder.userId);        
    });

   
    it('test list user orders => list should contain testOrder', async () => {
        const olist: Order[] = await orderModel.userOrders(usr.id as number);
        expect(olist.length).toBeGreaterThanOrEqual(1);
        // we use let because value will be changed every loop
        let cOrder: Order ;
        let founded = false;
        for(let i = 0;  i < olist.length; i++){
             cOrder = olist[i];
             if(cOrder.id == testOrder.id){
                founded = true;
                break;
             }
        }
        expect(founded).toBeTrue;
    });
});
