import {Request, Response, Router} from 'express';
import {Order, OrderModel} from '../store_models/order';

import authMiddleware from '../store_middleware/auth_middleware';
const orderApi = Router();

const orderModel = new OrderModel();

const create = async (req: Request, res: Response): Promise<void> =>{
    try {
        const o: Order = {
            oderStatus: req.body.oderStatus,
            userId: req.body.userId,
            products: req.body.products,
            totalPrice: req.body.totalPrice
        };

        const order = await orderModel.create(o);
        res.json(order);

    }catch(err){
        res.statusMessage = `Error during Create order. Error Details: ${err}`;
        res.sendStatus(500);
    }
}

const show = async (req: Request, res: Response): Promise<void> =>{
    try {       
        const id: number = parseInt(req.params.id);
        const order = await orderModel.show(id);
        res.json(order);

    }catch(err){
        res.statusMessage = `Error during get order. Error Details: ${err}`;
        res.sendStatus(500);
    }
}

const index = async (req: Request, res: Response): Promise<void> =>{
    try{
        const userId = parseInt(req.query.userId as string);
        let oderes: Order[];
        if(userId){
            oderes = await orderModel.userOrders(userId);
        }else{
            oderes = await orderModel.index();
        }

        res.json(oderes);
    }catch(err){
        res.statusMessage = `Error during list Products. Error Details: ${err}`;
        res.sendStatus(500);
    }
}

orderApi.post('/orders', authMiddleware, create);
orderApi.get('/orders/:id', authMiddleware, show);
orderApi.get('/orders', authMiddleware, index);

export default orderApi;