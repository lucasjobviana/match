import BaseController from './BaseController';
import { TImageBlob, TMatch, TUser } from '../interface';
import BaseService from '../service/BaseService';
import { IImageController } from '../interface/IImageController';
import { IImageService } from '../interface';
import { NextFunction } from 'express';
 
export default class MatchController extends BaseController<TMatch>{
  constructor(
    private matchService: BaseService<TMatch>,
  ) { super(matchService); }
} 