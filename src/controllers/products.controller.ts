import { Request, Response } from 'express';
import ProductService from '../services/products.service';

interface Product {
  id?: number;
  name: string;
  amount: number;
}

export default class ProductController {
  service: ProductService;
    
  constructor(productService = new ProductService()) {
    this.service = productService;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }
    
  async getAll(req: Request, res: Response): Promise<void> {
    const products = await this.service.getAll();
    res.status(200).json(products);
  }
    
  async create(req: Request, res: Response): Promise<void> {
    const product = req.body as Product;
    const newProduct = await this.service.create(product);
    res.status(201).json(newProduct);
  }
}