import BaseController from './BaseController';
import { TMatch, TNewMatch } from '../interface';
import BaseService from '../service/BaseService';
import { NextFunction, Request, Response } from 'express';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import SequelizeImageBlobModel from '../database/models/SequelizeImageBlobModel';
 
export default class NewMatchController extends BaseController<TNewMatch>{
  constructor(
    private newMatchService: BaseService<TNewMatch>
  ) { super(newMatchService); }

  public async findNewMatchNotifications(req: Request, _res: Response, next:NextFunction) { 
    const id = req.headers['id'] as string;
    const newMatchUsers = await this.newMatchService.findAllLikeByFieldName('userId',id);
    
     
    if(newMatchUsers.length > 0){
      console.log(newMatchUsers)
     const promise = newMatchUsers.map(async (user)=>{
        const loggedSocket = req.connectedUsers[id]; 
        const newMatchUser = await SequelizeUserModel.findOne({
          where:{
            id: user.targetId
          },
          include:{
            model: SequelizeImageBlobModel,
            as: 'images',
          }
        });

        if (loggedSocket) {  
          await this.newMatchService.delete(id);
          console.log(newMatchUser)
          setTimeout(()=>{ 
            req.io.to(loggedSocket).emit('match', JSON.stringify( {
              ...newMatchUser?.dataValues
            }));
          },2000);
        }
      });
      console.log(promise)
      await Promise.all(promise);
      
    }
    console.log('else não tem newMatchUser', id)
    next();
  }
} 