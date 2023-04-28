import connection from '../models/connection';
import UsersModel from '../models/users.model';

interface User {
  id?: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
}

export default class UsersService {
  model: UsersModel;
    
  constructor() {
    this.model = new UsersModel(connection);
  }
    
  async getAll(): Promise<User[]> {
    const users = await this.model.getAll();
    return users;
  }
    
  async create(user: User): Promise<User> {
    const newUser = await this.model.create(user);

    return newUser;
  }
}
