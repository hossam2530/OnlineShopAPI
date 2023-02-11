import supertest from 'supertest';
import storeApp from '../../index';
const userTester = supertest(storeApp);
let userToken = "";
let userId = 0;

describe('Test user handler', () => {

    it('test /api/users => craete user and retrive token', async () => {
        const response = await userTester.post('/api/users')
        .set('Content-type', 'application/json')
        .send({
            firstName: "Youssef",
            lastName: "Moussa",
            userName: "ymoussa",
            password: "1234"            
        });

        expect(response.status).toBe(200);
        const {token, user} = JSON.parse(response.text);
        userToken = token;
        userId = user.id;
    });        
    
    it('test /api/users index => list of all users', async () => {
        const response = await userTester.get('/api/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        const users = JSON.parse(response.text);
        expect(users.length).toBeGreaterThanOrEqual(1);
    });
    
    it('test /api/users show => retrive user by id', async () => {
        const response = await userTester.get(`/api/users/${userId}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        const user = JSON.parse(response.text);
        expect(user.userName).toEqual("ymoussa");
    });
});
