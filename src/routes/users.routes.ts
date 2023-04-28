import { Router } from 'express';
import UserController from '../controllers/users.controller';
// import auth from '../middlewares/auth.middleware';

const router = Router();

const userController = new UserController();

router.get('/', userController.getAll);
router.post('/', userController.create);

export default router;