import { Request, Router, Response } from 'express';
import { imageController, userController } from '../config';
const multer = require('multer'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.get( 
  '/',
  (req: Request, res: Response) => userController.findPotentialMatches(req, res),
);

router.get( 
  '/matchs',
  (req: Request, res: Response) => userController.findAllMatchesById(req, res),
);

router.post(
  '/like',
  (req: Request, res: Response) => userController.like(req, res),
);

router.post(
  '/unlike',
  (req: Request, res: Response) => userController.unlike(req, res),
);

router.post(
  '/dislike',
  (req: Request, res: Response) => userController.dislike(req, res),
); 

router.post(
  '/undislike',
  (req: Request, res: Response) => userController.undislike(req, res),
);
  
router.put(
  '/:id/',
  upload.array('files',10),
  async (req: Request, res: Response, next) => { await imageController.replaceAllUserImages(req, res, next)},
  async (req: Request, res: Response) => { await userController.update(req, res)},
);

export default router;