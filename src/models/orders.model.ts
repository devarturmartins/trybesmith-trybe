import { Pool } from 'mysql2/promise';

interface Order {
  id?: number;
  user_id: number;
  productsIds: number[];
}

export default class OrdersModel {
  connection: Pool;
    
  constructor(connection: Pool) {
    this.connection = connection;
  }
    
  async getAll(): Promise<Order[]> {
    const orders = await this.connection.execute(
      `
      SELECT o.id as id, o.user_id as userId, JSON_ARRAYAGG(p.id) as productsIds 
      FROM Trybesmith.orders as o
      INNER JOIN Trybesmith.products as p ON o.id = p.order_id
      GROUP BY o.id;`,
    );
    const [result] = orders;
    
    return result as Order[];
  }
}
