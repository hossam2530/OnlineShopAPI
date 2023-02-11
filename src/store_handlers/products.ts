import {Request, Response, Router} from 'express';
import {Product, ProductModel} from '../store_models/product';

import authMiddleware from '../store_middleware/auth_middleware';
const productApi = Router();

const productModel = new ProductModel();

const create = async (req: Request, res: Response): Promise<void> =>{
    try {
        const p: Product = {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productCategory: req.body.productCategory,
        };
        const product = await productModel.create(p);
        res.json(product);

    }catch(err){
        res.statusMessage = `Error during Create Product. Error Details: ${err}`;
        res.sendStatus(500);
    }
}

const show = async (req: Request, res: Response): Promise<void> =>{
    try {       
        const id: number = parseInt(req.params.id);
        const product = await productModel.show(id);
        res.json(product);

    }catch(err){
        res.statusMessage = `Error during get Product. Error Details: ${err}`;
        res.sendStatus(500);
    }
}

const index = async (req: Request, res: Response): Promise<void> =>{
    try{
        const catg: string = (req.query.productCategory as string);
        let products: Product[];
        if(catg){
            products = await productModel.byCategory(catg);
        }else{
            products = await productModel.index();
        }

        res.json(products);
    }catch(err){
        res.statusMessage = `Error during list Products. Error Details: ${err}`;
        res.sendStatus(500);
    }
}

productApi.post('/products', authMiddleware, create);
productApi.get('/products/:id', show);
productApi.get('/products', index);

export default productApi;