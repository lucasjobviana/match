import BaseService from './BaseService';
import { TImageBlob } from '../interface';
import BaseModel from '../model/BaseModel';
import { IImageService } from '../interface/IImageService';
import SequelizeImageBlobModel from '../database/models/SequelizeImageBlobModel';


export default class ImageService extends BaseService<TImageBlob> implements IImageService {
  constructor(
    private imageModel:BaseModel<TImageBlob>,
  ) { super(imageModel); }

  public async replaceAllUserImages(id: number, files: TImageBlob[]) {

    await SequelizeImageBlobModel.destroy({where:{userId:id}})
  
    const images = files.map((image) => {
      console.log(image.originalname)
      console.log(image.buffer)
      console.log(Number(id))
      return {
      fileName:image.originalname,  
      fileData: image.buffer,
      userId: Number(id)
      };
    })

    await SequelizeImageBlobModel.bulkCreate(images) 
  }
 
} 