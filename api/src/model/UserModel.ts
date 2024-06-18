import BaseModel from './BaseModel';
import { Op } from 'sequelize';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import { TUser } from '../interface';
import { IFindAbleById } from '../interface/IFindAbleById';
import SequelizeImageBlobModel from '../database/models/SequelizeImageBlobModel';
  
export default class UserModel extends BaseModel<TUser> implements IFindAbleById<TUser>{
  constructor(
  ) { super(SequelizeUserModel,['id','name','phone','username']);  }

  public async getWithAllAssociationsByUsername(username: string) {
    const user = await SequelizeUserModel.findOne({
      where: {
        username,
      },
      include: [
        {
          model: SequelizeUserModel,
          as: 'relatedUsers',
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        },
        {
          model: SequelizeUserModel,
          as: 'dislikeUsers',
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        },
        {
          model: SequelizeUserModel,
          as: 'matchedUsersAsFirstUser',
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        },
        {
          model: SequelizeUserModel,
          as: 'matchedUsersAsLastUser',
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        },
        {
          model: SequelizeImageBlobModel,
          as: 'images',
        }
      ]
    });
  
    const matchedUsers = [...user.matchedUsersAsFirstUser, ...user.matchedUsersAsLastUser];
  
    return {
      ...user.toJSON(),
      matchedUsers
    };
  }
  
  public async getWithLikesById(id: number) {
    
    return await SequelizeUserModel.findOne({
      where: {
        id:id.toString(),
      },
      include: { 
        model: SequelizeUserModel, 
        as: 'relatedUsers', 
        attributes:['id'], 
        through: {
          attributes: []
        }
      },
    }) || null;
  }

  public async getWithDislikesById(id: number) {
  
    return await SequelizeUserModel.findOne({
      where: {
        id:id.toString(),
      },
      include: { 
        model: SequelizeUserModel, 
        as: 'dislikeUsers', 
        attributes:['id'], 
        through: {
          attributes: []
        }
      },
    }) || null;
  }

  public async findPotentialMatches(user:TUser): Promise<TUser[]> {
    const likkedUsers = user.relatedUsers?.map((u)=>u.id) ?? [];
    const dislikkedUsers = user.dislikeUsers?.map((u)=>u.id) ?? [];
    return await SequelizeUserModel.findAll({
      where: {
        [Op.and]:{
          ['name']: {
            [Op.like]: `%%`,
          },
          ['id']: {
            [Op.notIn]: [...likkedUsers, ...dislikkedUsers, user.id]
          },
        } 
      },include: [{
         model: SequelizeImageBlobModel,
         as:'images',
       }]
      
    });
  }
 
  public async findNextPotentialMatch(user:TUser): Promise<TUser> {
    const likkedUsers = user.relatedUsers?.map((u)=>u.id) ?? [];
    const dislikkedUsers = user.dislikeUsers?.map((u)=>u.id) ?? [];
    return await SequelizeUserModel.findOne({
      where: {
        [Op.and]:{
          ['name']: {
            [Op.like]: `%%`,
          },
          ['id']: {
            [Op.notIn]: [...likkedUsers, ...dislikkedUsers, user.id]
          },
        } 
      },include: [{
         model: SequelizeImageBlobModel,
         as:'images',
       }]
      
    });
  }

  public async getWithLikesImagesById(id: number) {
    
    return await SequelizeUserModel.findOne({
      where: {
        id:id,
      },
      include: [{
        model:SequelizeUserModel,
        as:'relatedUsers',
        attributes:['id','name'],
        through: {
         attributes: []
       }
     },{
         model: SequelizeImageBlobModel,
         as:'images',
       }]
    }) || null;
  }
} 