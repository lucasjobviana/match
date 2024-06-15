import { Request, Router, Response, NextFunction } from 'express';
import { imageController, userController, newMatchController } from '../config';
import SequelizeMessageModel from '../database/models/SequelizeMessageModel';
import { TMessage } from '../type';

const multer = require('multer'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.get( 
  '/',
  (req: Request, res: Response, next:NextFunction) => (newMatchController.findNewMatchNotifications(req, res,next)),
  (req: Request, res: Response) => userController.findPotentialMatches(req, res),
);

router.get( 
  '/matchs',
  (req: Request, res: Response) => userController.findAllMatchesById(req, res),
);


router.post(
  '/matchs/message',
  async(req: Request, res: Response) => {
    const {userId, matchId, content} = req.body;
    console.log(req.body)
    console.log(userId, matchId, content)
    const a = await SequelizeMessageModel.create({sender:userId,content,match:matchId});
    console.log(a)
    return res.status(200).json(a);
  },
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