import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// interface createUser {
//   id?: number;
//   username: string;
//   vocation: string;
//   level: number;
//   password: string;
// } 

function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const isValid = jwt.verify(authorization, process.env.JWT_SECRET as string);

    // req.userId = isValid.data;

    if (!isValid) {
      return res.status(401).json({ error: 'Expired or invalid token' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Expired or invalid token' });
  }
}

export default auth;