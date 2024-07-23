import { Request, Router, Response } from 'express';
import { userController } from '../config';

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