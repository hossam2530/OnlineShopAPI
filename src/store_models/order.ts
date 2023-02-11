import db from '../db';
import {OrderProducts, OrderProductsModel} from './orderProducts';

export type Order ={
    id?: number,
    products: OrderProducts[],
    userId: number,
    oderStatus:string,
    totalPrice:number
}

export class OrderModel {
    

   // this funcion is used to map between (database column names from joins) and Order type
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapToOrder(obj: any, items: OrderProducts[]): Order{
        return {
            id: obj.id,
            products: items,
            userId: obj.u_id,
            oderStatus: obj.order_status,
            totalPrice:obj.total_price
        }
    }
   
    async index(): Promise<Order[]> {
        try{
            const db_con = await db.connect();
            const osql = `SELECT * from user_order`;
            const rs = await db_con.query(osql);
            db_con.release();
            const opm = new OrderProductsModel();
            const orders: Order[] = [];
            for (let i = 0; i < rs.rows.length; i++) {
                const items =  await opm.productsByOrder(rs.rows[i].id);
                const corder = this.mapToOrder(rs.rows[i], items);
                orders[i] = corder;
            }

            return orders;
        }catch(err){
            throw new Error(`Error during list all Orders. Error Details: ${err}`);
        }
    }

    async userOrders(userId: number): Promise<Order[]> {
        try{
            const db_con = await db.connect();
            const osql = `SELECT * from user_order where u_id = ($1)`;
            const rs = await db_con.query(osql, [userId]);
            db_con.release();
            const opm = new OrderProductsModel();
            const orders: Order[] = [];
            for (let i = 0; i < rs.rows.length; i++) {
                const items =  await opm.productsByOrder(rs.rows[i].id);
                const corder = this.mapToOrder(rs.rows[i], items);
                orders[i] = corder;
            }

            return orders;
        }catch(err){
            throw new Error(`Error during list user: ${userId} Orders. Error Details: ${err}`);
        }
    }
    async show(id: number): Promise<Order> {
        try {
            const show_sql = 'SELECT * FROM user_order WHERE id=($1)';
            const db_con = await db.connect();
            const rs = await db_con.query(show_sql, [id]);
            db_con.release();
            const opm = new OrderProductsModel();
            const items =  await opm.productsByOrder(rs.rows[0].id);
            return  this.mapToOrder(rs.rows[0], items);
        }catch(err){
            throw new Error(`Error during find order ${id}. Error: ${err}`)
        }
    }
  
    async create(o: Order): Promise<Order> {
        try {
            const o_sql = 'INSERT INTO user_order (order_status, u_id, total_price) VALUES($1, $2, $3) RETURNING id';
            const db_con = await db.connect();            
            const rs = await db_con.query(o_sql, [o.oderStatus, o.userId, o.totalPrice]);
            db_con.release();
            o.id = rs.rows[0].id;
            const opm = new OrderProductsModel();            
            await opm.create(o.products, o.id as number);            
            return o;
        }catch(err){
            throw new Error(`Error during place your order . Error Details: ${err}`);
        }
    }

}