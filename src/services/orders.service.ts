import OrdersModel from '../models/orders.model';
import connection from '../models/connection';

interface Order {
  id?: number;
  user_id: number;
  productsIds: number[]; 
}

export default class OrdersService {
  model: OrdersModel;
    
  constructor() {
    this.model = new OrdersModel(connection);
  }
    
  async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }
}
