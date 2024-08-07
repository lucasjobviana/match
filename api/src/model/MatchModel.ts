import BaseModel from './BaseModel';
import { TMatch } from '../interface';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IMatchModel } from '../interface/IMatchModel';
import { Op } from 'sequelize';
import AppResponseError from '../AppResponseError';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import SequelizeMessageModel from '../database/models/SequelizeMessageModel';
  
export default class MatchModel extends BaseModel<TMatch> implements IMatchModel{
  constructor(
  ) { super(SequelizeMatchModel,['firstUserId','lastUserId']);  }

  public async findAllMatchesById(id: number): Promise<TMatch[]> {
    console.clear();
    console.log('model____________________')
    const matchs = await SequelizeMatchModel.findAll({
      where:{
        [Op.or]:{
          ['firstUserId']:id,
          ['lastUserId']:id,
        }  
      }, 
      include:[
        { model: SequelizeUserModel, as: 'FirstUser'},
        { model: SequelizeUserModel, as: 'LastUser'},
        { model: SequelizeMessageModel, as: 'messages'
        // , order:[['messages','id','ASC']]
        },
      ],
      attributes:['firstUserId','lastUserId','id'],
       order:[['messages','id','ASC']]
      // order: [['FirstUser', 'id', 'ASC'],['LastUser', 'id', 'ASC'],['messages', 'id', 'ASC']],
    });
    // console.log(matchs[0].messages)

    const filteredMatches = matchs.map(match => match.firstUserId === id ? 
      {matchedUser:{...match.LastUser.dataValues,matchId:match.id}, messages:match.messages.map((m)=>
        m.dataValues
      )|| []} :  
      {matchedUser:{...match.FirstUser.dataValues,matchId:match.id}, messages:match.messages.map((m)=>
        m.dataValues
      ) || []}
    ).filter(match => match.matchedUser.id !== id);
    console.log(matchs[0].messages.map((m)=>m.dataValues))
    console.log('filtered matches ++++++++++++++++++++++')
    console.log(filteredMatches[0].messages)
  
    if(matchs) return filteredMatches;
    throw new AppResponseError(`Matchs do usuário ${id} não encontrados`)
  }
} 