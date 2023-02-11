import { Pool } from 'pg'
import storeCfg from '../store_config'

const db_prod_pool = new Pool({
    host: storeCfg.DB_SERVER,
    database: storeCfg.DB_NAME,
    user: storeCfg.DB_USER,
    password: storeCfg.DB_PASS,
});

export default db_prod_pool;