import BaseController from './BaseController';
import { TImageBlob, TUser } from '../interface';
import BaseService from '../service/BaseService';
import { IImageController } from '../interface/IImageController';
import { IImageService } from '../interface';
import { NextFunction, response } from 'express';
 
export default class ImageController extends BaseController<TImageBlob> implements IImageController{
  constructor(
    private imageService: BaseService<TImageBlob> & IImageService,
  ) { super(imageService); }

  public async replaceAllUserImages(req: Request, res: Response, next:NextFunction) {
    const files = req.files;//
    const { id } = req.params;
    console.log('images.replaceAllUserImages files')
    console.log(files)
    if(files){ 
      files.map((f)=>console.log(f))
    }else{
      console.log('nao tem files')
    }
    await this.imageService.replaceAllUserImages(id, files)
    next();
    // return res.json();
  }
  

} 