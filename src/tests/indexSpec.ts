import supertest from 'supertest';
import storeApp from '../index';

const storeTester = supertest(storeApp);
describe('Test Online Shop API endpoint responses', () => {
  it('test / endpoint status => 200', async () => {
    const response = await storeTester.get('/');
    expect(response.status).toBe(200);
  });

  it('test / endpoint response => H2 Welcome Msg', async () => {
    const response = await storeTester.get('/');
    expect(response.text).toBe(`
    <h2>Welcome to Store App API</h2>
    `);
  });
  
});
