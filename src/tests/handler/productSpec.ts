import supertest from 'supertest';
import storeApp from '../../index';
import { UserModel, User } from '../../store_models/user';
const productTester = supertest(storeApp);
let userToken = "";
let prid = 0;

const testProductUser: User = {
    firstName: "test",
    lastName: "products",
    userName: "tp01",
    password: "1234"
   };
   const userModel = new UserModel();
   
describe('Test product handler', () => {
    beforeAll(async () => {         
       await userModel.create(testProductUser);
    });

    afterAll(async () =>{
        await userModel.delete(testProductUser.userName);
    });
    
    it('test /api/products => login to retrive token', async () => {
        const response = await productTester.post('/api/login')
        .set('Content-type', 'application/json')
        .send(testProductUser);
        expect(response.status).toBe(200);
        const {token} = JSON.parse(response.text);
        userToken = token; 
    });

    it('test /api/products create => add product', async () => {
        const response = await productTester.post('/api/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
            "productName": "Apple",
            "productPrice": "15",
            "productCategory": "fruit"
        });

        expect(response.status).toBe(200);
        const product = JSON.parse(response.text);
        prid = product.id;
        expect(product.id).toBeGreaterThanOrEqual(1);
    });
    
    it('test /api/products index => list of all products', async () => {
        const response = await productTester.get('/api/products')
        .set('Content-type', 'application/json')

        expect(response.status).toBe(200);
        const products = JSON.parse(response.text);
        expect(products.length).toBeGreaterThanOrEqual(1);        
    });
    
    it('test /api/users show => retrive product by id', async () => {
        const response = await productTester.get(`/api/products/${prid}`)
        .set('Content-type', 'application/json')

        expect(response.status).toBe(200);
        const product = JSON.parse(response.text);
        expect(product.productName).toEqual("Apple");
    });


    it('test /api/users show => retrive product by category', async () => {
        const response = await productTester.get(`/api/products?productCategory=fruit`)
        .set('Content-type', 'application/json')
        expect(response.status).toBe(200);
        const product = JSON.parse(response.text);
        expect(product.length).toBeGreaterThanOrEqual(1);
    });
   
});
