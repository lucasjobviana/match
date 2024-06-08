import BaseService from '../service/BaseService';
import { TImageBlob, TUser } from './type';
import { IReplaceAbleAllImages } from './IReplaceAbleAllImages';
 
export interface IImageController extends 
  // BaseService<TImageBlob>,
  IReplaceAbleAllImages<TUser>{}
