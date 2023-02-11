import db from '../db';
import bcrypt from 'bcrypt';
import cfg from '../store_config';

export type User ={
    id?: number,
    firstName: string,
    lastName: string,
    userName: string,
    password?: string
}

export class UserModel {
    /**
     * the UserModel uses login to retrive token and the token has expiration 
     * so that create will not return token 
     * after create you have to login 
    */

   // this funcion is used to map between database column names and User type
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapToUser(obj: any): User{
        return {
            id: obj.id,
            firstName: obj.first_name,
            lastName: obj.last_name,
            userName: obj.user_name,
        }
    }
    
    /**
     * 
     * @name index 
     * @returns: User[]
     * @description: 
     * used to list all users
     * 
     */    
    async index(): Promise<User[]> {
        try{
            const db_con = await db.connect();
            const rs = await db_con.query('SELECT * FROM Users');
            db_con.release();
            const users: User[] = rs.rows.map( (cuser) => {
                return this.mapToUser(cuser);
            }, this);

            return users; 
        }catch(err){
            throw new Error(`Error during list all Users. Error Details: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const show_sql = 'SELECT * FROM Users WHERE id=($1)';
            const db_con = await db.connect();
            const rs = await db_con.query(show_sql, [id]);
            db_con.release();
            return  this.mapToUser(rs.rows[0]);
        }catch(err){
            throw new Error(`Error during find user ${id}. Error: ${err}`)
        }
    }
  
    async create(u: User): Promise<User> {
        try {
            const c_sql = 'INSERT INTO Users (first_name, last_name, user_name, password) VALUES($1, $2, $3, $4) RETURNING *';
            const db_con = await db.connect();
            const password_hash = bcrypt.hashSync(
            (u.password as string) + cfg.SECRET_SALT, 
                parseInt(cfg.SALT_ROUND as string)
            );
            const rs = await db_con.query(c_sql, [u.firstName, u.lastName, u.userName, password_hash]);
            db_con.release();
            return this.mapToUser(rs.rows[0]);
        }catch(err){
            throw new Error(`Error during add new User ${u.userName}. Error Details: ${err}`);
        }
    }

    async delete(userName: string): Promise<User | null> {
        const db_con = await db.connect();
        const rs = await db_con.query(`delete from Users where user_name = ($1) returning *`, [userName]);
        db_con.release();
        if(rs.rows.length) {            
            return this.mapToUser(rs.rows[0]);            
        }  
        return null;     
    }

    async authenticate(inputUserName: string, inputPassword: string): Promise<User | null> {
        try {       
            // retrive user info including stored hashed password
            const a_sql = 'SELECT * FROM users WHERE user_name=($1)';
            const db_con = await db.connect();

            const rs = await db_con.query(a_sql, [inputUserName]); 
            db_con.release();

            if(rs.rows.length) {  
                const {password} = rs.rows[0];
                const usr = this.mapToUser(rs.rows[0]);
                if (bcrypt.compareSync(inputPassword + cfg.SECRET_SALT, password )) {            
                    return usr;
                }
            }
            return null;
        }catch(err){
            throw new Error(`Error during auth User ${inputUserName}. Error Details: ${err}`);
        }
    }
}