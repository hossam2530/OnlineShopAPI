import dotenv from 'dotenv';

dotenv.config();
const {
    NODE_ENV,
    SERVER_PORT,
    SECRET_SALT,
    SALT_ROUND,
    JWT_KEY,
    DB_SERVER,
    DB_PORT,
    DB_NAME,
    DB_NAME_TEST,
    DB_USER,
    DB_PASS
} = process.env;

console.log(NODE_ENV);

export default{
    SERVER_PORT,
    SECRET_SALT,
    SALT_ROUND,
    JWT_KEY,
    DB_SERVER,
    DB_PORT,
    DB_NAME: NODE_ENV === 'test' ? DB_NAME_TEST : DB_NAME,    
    DB_USER,
    DB_PASS
}


