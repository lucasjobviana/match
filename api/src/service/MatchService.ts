import BaseService from './BaseService';
import { TMatch, TUser } from '../interface';
import BaseModel from '../model/BaseModel';
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
   
    if(!targetMatches) throw new AppResponseError(`Usuário ${id} não tem matchs`)

    const promises = targetMatches.map(async (target) => {
      const images = await SequelizeImageBlobModel.findAll({ where: { userId: target.matchedUser?.id } });
      const imagesFile = images.map((i)=>i.dataValues);

      return {      
        images:imagesFile  || [],
        ...target.matchedUser.dataValues
      };
    });
    
      return await Promise.all(promises);
  }
}  