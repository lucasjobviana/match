import BaseService from './BaseService';
import { TImageBlob, TMatch, TUser } from '../interface';
import BaseModel from '../model/BaseModel';
import { IImageService } from '../interface/IImageService';
import SequelizeImageBlobModel from '../database/models/SequelizeImageBlobModel';
import { IMatchService } from '../interface/IMatchService';
import { IMatchModel } from '../interface/IMatchModel';
import AppResponseError from '../AppResponseError';


export default class MatchService extends BaseService<TMatch> implements IMatchService {
  constructor(
    private matchModel:BaseModel<TMatch> & IMatchModel,
  ) { super(matchModel); }

  public async findAllMatchesById(id: number): Promise<TUser[]> {
    const targetMatches = await this.matchModel.findAllMatchesById(id);
    if(!targetMatches) throw new AppResponseError('não tem mathces')
      const promises = targetMatches.map(async (target) => {
        const images = await SequelizeImageBlobModel.findAll({ where: { userId: target.matchedUser?.id } });
        console.log(images)
        const imagesFile = images.map((i)=>i.dataValues);
        console.log(imagesFile)
        return { 
          
          images:imagesFile  || [],
          id:target.matchedUser?.id,
          name: target.matchedUser?.name,
          username: target.matchedUser?.username,
          password: '',
          phone: target.matchedUser?.phone
          // matchedUser: {
          //   ...target.matchedUser,
          //   images
          // }
        };
      });
    
      return await Promise.all(promises);
  }
}  