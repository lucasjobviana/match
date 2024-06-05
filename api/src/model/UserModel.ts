import BaseModel from './BaseModel';
import { Op } from 'sequelize';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import { TUser } from '../interface';
import { IFindAbleById } from '../interface/IFindAbleById';
import SequelizeImageBlobModel from '../database/models/SequelizeImageBlobModel';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
  
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
  
    // Combine matched users from both aliases
    const matchedUsers = [...user.matchedUsersAsFirstUser, ...user.matchedUsersAsLastUser];
  
    return {
      ...user.toJSON(),
      matchedUsers
    };
  }
  
  //s.user.login, inclue like, dislike, images
  // public async getWithAllAssociationsByUsername(username:string) {
  //   const user = await SequelizeUserModel.findOne({
  //     where: {
  //       username,
  //     },
  //     include: [{
  //        model:SequelizeUserModel,
  //        as:'relatedUsers',
  //        attributes:['id','name'],
  //        through: {
  //         attributes: []
  //       }
  //     },{model:SequelizeUserModel,
  //       as:'dislikeUsers',
  //       attributes:['id','name'],
  //       through: {
  //         attributes: []
  //       }}
  //       ,
  //       {
  //         model:SequelizeUserModel,
  //         as:'matchedUsers',
  //         attributes:['id','name'],
  //         through: {
  //           attributes: []
  //         }}
  //       ,{
  //         model: SequelizeImageBlobModel,
  //         as:'images',
  //       }]
  //   });
  //   return user;
  // }
  //s.user.findPotentialMatches like
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

  //s.user.findPotentialMatches dislike
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
  //s.user.findPotentialMatches images
  // findPotentialMatches(user:TUser): Promise<TUser[]>,
  public async findPotentialMatches(user:TUser): Promise<TUser[]> {
    // console.log('findpotentialmatches ');
    // console.log(user)
    const likkedUsers = user.relatedUsers?.map((u)=>u.id) ?? [];
    const dislikkedUsers = user.dislikeUsers?.map((u)=>u.id) ?? [];
    return SequelizeUserModel.findAll({
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