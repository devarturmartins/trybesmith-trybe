import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserService from '../services/users.service';

interface User {
  id?: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
}

export default class UserController {
  service: UserService;
        
  constructor(userService = new UserService()) {
    this.service = userService;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }
        
  async getAll(req: Request, res: Response): Promise<void> {
    const users = await this.service.getAll();
    res.status(200).json(users);
  }

  async create(req: Request, res: Response): Promise<void> {
    const user = req.body as User;
    const newUser = await this.service.create(user);

    const newToken = jwt.sign({ data: newUser }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    res.status(201).json({ token: newToken });
  }
}
