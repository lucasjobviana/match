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
    // console.log(targetMatches[0])
    // console.log(messages0)
   
    if(!targetMatches) throw new AppResponseError(`Usuário ${id} não tem matchs`)
      //reordenar targetMatches por ultimo id da mensagem
    const ordenedMatchesByDate = targetMatches.sort((a,b)=>{
      if(a.messages && a.messages.length > 0 && b.messages && b.messages.length > 0){
        console.log(a.messages)
        console.log(a.messages.slice(-1))
        const seila = a.messages.slice(-1);
        console.log(seila[0])
        console.log(seila[0].id)
        // console.log((a.messages.slice(-1))[0].id)
        const lastMessageA = a.messages.slice(-1)[0].id;
        const lastMessageB = b.messages.slice(-1)[0].id;
        if(lastMessageA<lastMessageB) return 1
        if(lastMessageA>lastMessageB) return -1
        return 0;
      }
      return -1;
      
    })
    console.log('_________________ordened by date___________________')
    console.log(ordenedMatchesByDate)

    const promises = ordenedMatchesByDate.map(async (target) => {
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