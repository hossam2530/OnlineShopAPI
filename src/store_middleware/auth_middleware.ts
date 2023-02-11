import cfg from '../store_config';
import {Request, Response, NextFunction} from 'express';
import JWT from 'jsonwebtoken';

const verifyStoreToken = (req: Request, res: Response, nextFun: NextFunction) => {
    try {

        const store_auth = req.headers.authorization;
        if(store_auth){
            // auth is 2 parts seprated by space, 1st is beruer, 2nd is the token
            // so we split the string with space and get the index 1 in the array to get token
            const storeToken = (store_auth).split(' ')[1];
            // verviy token using the same key
            JWT.verify(storeToken, cfg.JWT_KEY as string, function(err, decoded){
                if(err){
                     // we throw error to next function 
                     res.sendStatus(401);
                nextFun(err.message);
                }else if (decoded){
                    // if decoded move to next function and cotinue            
                    nextFun();
                }
            });
        }        
    } catch (error) {
        res.status(401)
    }
}

export default verifyStoreToken;

