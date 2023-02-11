import db from '../db';

export type Product ={
    id?: number,
    productName: string,
    productPrice: number,
    productCategory: string,
}

export class ProductModel {
    // this funcion is used to map between database column names and Product type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapToProduct(obj: any): Product{
        return {
            id: obj.id,
            productName: obj.product_name,
            productPrice: obj.product_price,
            productCategory: obj.product_category,
        }
    }    
    
    async create(p: Product): Promise<Product> {
        try {
            const c_sql = 'INSERT INTO product (product_name, product_price, product_category) VALUES($1, $2, $3) RETURNING *';
            const db_con = await db.connect();
            const rs = await db_con.query(c_sql, [p.productName, p.productPrice, p.productCategory]);
            db_con.release();
            return this.mapToProduct(rs.rows[0]);
        }catch(err){
            throw new Error(`Error during add new Product ${p.productName}. Error Details: ${err}`);
        }
    }

    async index(): Promise<Product[]> {
        try{
            const db_con = await db.connect();
            const rs = await db_con.query('SELECT * FROM product');
            db_con.release();
            const products: Product[] = rs.rows.map( (cprod) => {
                return this.mapToProduct(cprod);
            }, this);

            return products; 
        }catch(err){
            throw new Error(`Error during list all Products. Error Details: ${err}`);
        }
    }

    async byCategory(catg: string): Promise<Product[]> {
        try{
            const db_con = await db.connect();
            const rs = await db_con.query('SELECT * FROM product WHERE product_category=($1)', [catg]);
            db_con.release();
            const products: Product[] = rs.rows.map( (cprod) => {
                return this.mapToProduct(cprod);
            }, this);

            return products; 
        }catch(err){
            throw new Error(`Error during list category Products. Error Details: ${err}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const show_sql = 'SELECT * FROM product WHERE id=($1)';
            const db_con = await db.connect();
            const rs = await db_con.query(show_sql, [id]);
            db_con.release();
            return  this.mapToProduct(rs.rows[0]);
        }catch(err){
            throw new Error(`Error during find product ${id}. Error: ${err}`)
        }
    }



}

