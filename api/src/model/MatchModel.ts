import BaseModel from './BaseModel';
import { TImageBlob, TMatch, TUser } from '../interface';
import SequelizeImageBlobModel from '../database/models/SequelizeImageBlobModel';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IMatchModel } from '../interface/IMatchModel';
import { Op } from 'sequelize';
import AppResponseError from '../AppResponseError';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import SequelizeNewMatchModel from '../database/models/SequelizeNewMatchModel';
  
export default class MatchModel extends BaseModel<TMatch> implements IMatchModel{
  constructor(
  ) { super(SequelizeMatchModel,['firstUserId','lastUserId']);  }

  public async findAllMatchesById(id: number): Promise<TMatch[]> {
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
      ],
      attributes:['firstUserId','lastUserId'],
    });

    const filteredMatches = matchs.map(match => {
      if (match.firstUserId === id) {
        return {
          // ...match.toJSON(),
          // firstUserId: match.firstUserId,
          // lastUserId: match.lastUserId,
          matchedUser: match.LastUser
        };
      } else {
        return {
          // ...match.toJSON(),
          // firstUserId: match.firstUserId,
          // lastUserId: match.lastUserId,
          matchedUser: match.FirstUser
        };
      }
    }).filter(match => match.matchedUser.id !== id);
  
     

    if(matchs) return filteredMatches;
    throw new AppResponseError('não achei os matchs do usuário '+id)
  }
} 