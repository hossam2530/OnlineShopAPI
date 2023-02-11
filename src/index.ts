import express from 'express';
import cfg from './store_config';
import userApi from './store_handlers/users';
import productApi from './store_handlers/products';
import orderApi from './store_handlers/orders';
import bodyParser from 'body-parser';

const store_app = express();
store_app.use(bodyParser.json());

store_app.get('/', (req: express.Request , res: express.Response):void => {
  res.send(`
    <h2>Welcome to Store App API</h2>
    `);
});

store_app.use('/api', userApi);
store_app.use('/api', productApi);
store_app.use('/api', orderApi);

store_app.listen(cfg.SERVER_PORT, (): void => {
   console.log(
     `Application Server started at localhost:${cfg.SERVER_PORT}`
   );
});

export default store_app;
