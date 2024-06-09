import BaseModel from './BaseModel';
import { TMatch } from '../interface';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IMatchModel } from '../interface/IMatchModel';
import { Op } from 'sequelize';
import AppResponseError from '../AppResponseError';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
  
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

    const filteredMatches = matchs.map(match => match.firstUserId === id ? 
      {matchedUser:match.LastUser} :  
      {matchedUser:match.FirstUser}
    ).filter(match => match.matchedUser.id !== id);
  
    if(matchs) return filteredMatches;
    throw new AppResponseError(`Matchs do usuário ${id} não encontrados`)
  }
} 