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
    console.log('servico de verdade');
    // const messages0 = targetMatches[0].messages.map((m)=>
    //   m.dataValues
    // );
    console.log(targetMatches[0].messages)
    console.log(targetMatches[0])
    // console.log(messages0)
   
    if(!targetMatches) throw new AppResponseError(`Usuário ${id} não tem matchs`)

    const promises = targetMatches.map(async (target) => {
      const images = await SequelizeImageBlobModel.findAll({ where: { userId: target.matchedUser?.id } });
      const imagesFile = images.map((i)=>i.dataValues);

      return {      
        images:imagesFile  || [],
        ...target.matchedUser,
        messages:target.messages || [],
      };
    });
    
      return await Promise.all(promises);
  }
}  