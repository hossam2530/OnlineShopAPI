import {Request, Response, Router} from 'express';
import {User, UserModel} from '../store_models/user';
import JWT from 'jsonwebtoken';
import cfg from '../store_config';
import authMiddleware from '../store_middleware/auth_middleware';
const userApi = Router();

const userModel = new UserModel();

const create = async (req: Request, res: Response): Promise<void> =>{
    try {
        const u: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,

        };

        const user = await userModel.create(u);
        const userToken = await generateStorToken(user);
        res.json({user: user, token:userToken });

    }catch(err){
        res.statusMessage = `Error during Create User. Error Details: ${err}`;
        res.sendStatus(500);
    }
}

const show = async (req: Request, res: Response): Promise<void> =>{
    try {       
        const id: number = parseInt(req.params.id);
        const user = await userModel.show(id);
        res.json(user);

    }catch(err){
        res.statusMessage = `Error during get User. Error Details: ${err}`;
        res.sendStatus(500);
    }
}

const index = async (req: Request, res: Response): Promise<void> =>{
    try{
        const users = await userModel.index();
        res.json(users);
    }catch(err){
        res.statusMessage = `Error during list Users. Error Details: ${err}`;
        res.sendStatus(500);
    }
}

const generateStorToken = async(user: User): Promise<string> =>{
    // generate jwt and return obj
    return await JWT.sign(user, cfg.JWT_KEY as string, {expiresIn: '30m'});
}

const login = async (req: Request, res: Response): Promise<void> =>{
    try {
        const loginObj= {     
            userName: req.body.userName,
            password: req.body.password,
        };

        const user = await userModel.authenticate(loginObj.userName, loginObj.password);
        if(user){
            const userToken = await generateStorToken(user);
            res.json({user: user, token:userToken });
        }else{
            res.statusMessage = `login faild try again`;
            res.sendStatus(200);
            res.json( {msg : "login faild"});
        }
        
    }catch(err){
        res.statusMessage = `login faild try again: ${err}`;
        res.sendStatus(500);
    }
}
    
userApi.post('/login', login);
userApi.post('/users', create);
userApi.get('/users/:id', authMiddleware, show);
userApi.get('/users', authMiddleware, index);
  
export default userApi;