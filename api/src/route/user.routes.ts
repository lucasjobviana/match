import { Request, Router, Response } from 'express';
import { imageController, userController } from '../config';
import SequelizeImageBlobModel from '../database/models/SequelizeImageBlobModel';
const multer = require('multer'); 
const ImageBlob = SequelizeImageBlobModel;
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

router.post('/upload/:id/', upload.single('file'), async (req: Request, res: Response) => {
  try {
      const file = req.file;
      const { id } = req.params;

      console.log(file)
      // console.log(req)
      console.log(req.params)
      console.log(id)
      if (!file) {console.log('nao tem file')
        console.log('nao tem file')
          return res.status(400).send('No file uploaded.');
      } 
      const newImage = await ImageBlob.create({
          fileName: file.originalname,
          fileData: file.buffer,
          userId: Number(id),
      });

      res.json({ imageUrl: `http://localhost:3001/images/${newImage.id}` });
  } catch (error) {
    console.log(error.message)
      res.status(500).send(error.message);
  }
});

export default router;