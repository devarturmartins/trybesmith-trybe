import { Pool, ResultSetHeader } from 'mysql2/promise';
// import connection from './connections';

interface Product {
  id?: number;
  name: string;
  amount: number;
}

export default class ProductsModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAll(): Promise<Product[]> {
    const products = await this.connection.execute(
      'SELECT * FROM Trybesmith.products;',
    );
    const [result] = products;

    return result as Product[];
  }

  async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?);',
      [name, amount],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }
}