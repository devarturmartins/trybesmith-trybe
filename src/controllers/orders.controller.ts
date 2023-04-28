import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';

// interface Order {
//   id?: number;
//   user_id: number;
//   productsIds: number[];
// }

export default class OrdersController {
  service: OrdersService;
    
  constructor(ordersService = new OrdersService()) {
    this.service = ordersService;
    this.getAll = this.getAll.bind(this);
  }
    
  async getAll(req: Request, res: Response) {
    const orders = await this.service.getAll();
    res.status(200).json(orders);
  }
}