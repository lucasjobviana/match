import BaseController from './BaseController';
import { TImageBlob } from '../interface';
import BaseService from '../service/BaseService';
import { IImageController } from '../interface/IImageController';
import { IImageService } from '../interface';
import { NextFunction, Request, Response } from 'express';
 
export default class ImageController extends BaseController<TImageBlob> implements IImageController{
  constructor(
    private imageService: BaseService<TImageBlob> & IImageService,
  ) { super(imageService); }

  public async replaceAllUserImages(req: Request, _res: Response, next:NextFunction) {
    const files = req.files;
    const { id } = req.params;
 
    await this.imageService.replaceAllUserImages(Number(id), files)
    next();
  }
} 