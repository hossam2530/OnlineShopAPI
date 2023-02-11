
import db from '../db';

export type OrderProducts ={
    productId: number,
    productName: string,
    quantity: number,
    totalPrice: number
}

export class OrderProductsModel {
    // this funcion is used to map between database column js type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapToType(obj: any): OrderProducts{
        return {
            productId: obj.p_id,
            productName: obj.product_name,
            quantity: obj.quantity,
            totalPrice: obj.total_price,
        }
    }   
    
    async create(items: OrderProducts[], orderId: number): Promise<OrderProducts[]> {        
        try {
            let sql = `INSERT INTO order_product (o_id, p_id, quantity, total_price) 
                VALUES `;
            items.forEach(item =>{
                sql+= `(${orderId}, ${item.productId}, ${item.quantity}, ${item.totalPrice}),`;
            });
            // remove lasr ,
            sql = sql.substring(0 , sql.length -1);
            const db_con = await db.connect();
            await db_con.query(sql);
            db_con.release();
            return new Promise((resolve) =>{
               resolve(items); 
            });

            
        }catch(err){
            throw new Error(`Error during add order Products. Error Details: ${err}`);
        }
    }

    async productsByOrder(orderId: number):Promise<OrderProducts[]> {
        try{
            const db_con = await db.connect();
            const sql = `SELECT p.product_name, op.* FROM 
                order_product op inner join product p
                on p.id = op.p_id  WHERE op.o_id=($1);`;
            const rs = await db_con.query(sql, [orderId]);
            db_con.release();
            const items: OrderProducts[] = rs.rows.map( (citem) => {
                return this.mapToType(citem);
            }, this);

            return items; 
        }catch(err){
            throw new Error(`Error during list order Products. Error Details: ${err}`);
        }
    }
}