import BaseModel from './BaseModel';
import { TImageBlob } from '../interface';
import SequelizeImageBlobModel from '../database/models/SequelizeImageBlobModel';
  
export default class ImageModel extends BaseModel<TImageBlob>{
  constructor(
  ) { super(SequelizeImageBlobModel,['id','fileName','fileData','userId']);  }
} 