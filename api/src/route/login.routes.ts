import { Request, Router, Response } from 'express';
import UserController from '../controller/UserController';
import { userController } from '../config';

// const userController = new UserController();
const router = Router();

router.post(
  '/',
  (req: Request, res: Response, next) =>userController.login(req, res, next),
);

router.post(
  '/register',
  (req: Request, res: Response, next) =>userController.register(req, res, next),
)


export default router;
