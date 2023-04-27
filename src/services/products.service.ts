import connection from '../models/connection';
import ProductsModel from '../models/products.model';

interface Product {
  id?: number;
  name: string;
  amount: number;
}

export default class ProductsService {
  model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  async create(product: Product): Promise<Product> {
    const newProduct = await this.model.create(product);
    return newProduct;
  }
}