import BaseService from './BaseService';
import { TImageBlob, TUser } from '../interface';
import BaseModel from '../model/BaseModel';
import { IImageService } from '../interface/IImageService';
import SequelizeImageBlobModel from '../database/models/SequelizeImageBlobModel';


export default class ImageService extends BaseService<TImageBlob> implements IImageService {
  constructor(
    private imageModel:BaseModel<TImageBlob>,
  ) { super(imageModel); }

  public async replaceAllUserImages(id: number, files: TImageBlob[]) {
    console.log('_________________________________')
    console.log(id)
    console.log(files)
    await SequelizeImageBlobModel.destroy({where:{userId:id}})
    console.clear()
    console.log('ja destrui')


    const images = files.map((image) => ({
      fileName:image.originalname,  
      fileData: image.buffer,
      userId: Number(id)
    }))
    const newImage = {
      fileName: files[0].originalname,
      fileData: files[0].buffer,
      userId: Number(id),
    };
    console.log(newImage)
    console.log(images)
    await SequelizeImageBlobModel.bulkCreate(images)
  // console.log(files[0])
  // console.log(newImage)

  // res.json({ imageUrl: `http://localhost:3001/images/${newImage.id}` });
  }
 
} 