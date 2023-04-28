import { Pool, ResultSetHeader } from 'mysql2/promise';

interface User {
  id?: number;
  username: string;
  vocation: string; 
  level: number;
  password: string;
}

export default class UsersModel {
  connection: Pool;
    
  constructor(connection: Pool) {
    this.connection = connection;
  }
    
  async getAll(): Promise<User[]> {
    const users = await this.connection.execute(
      'SELECT * FROM Trybesmith.users;',
    );
    const [result] = users;
    
    return result as User[];
  }
    
  async create(user: User): Promise<User> {
    const { username, vocation, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.users (username, vocation, level, password) VALUES (?, ?, ?, ?);',
      [username, vocation, level, password],
    );
    
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }
}