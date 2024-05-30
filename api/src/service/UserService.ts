import BaseService from './BaseService';
import { IUserModel, TUser } from '../interface';
import SequelizeLikeModel from '../database/models/UserLikeToUser';
import AppResponseError from '../AppResponseError';
import UserDislikeToUser from '../database/models/UserDislikeToUser';
import SequelizeImageBlobModel from '../database/models/SequelizeImageBlobModel';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IUserService } from '../interface/IUserService';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import { TServiceLikeResponse } from '../interface/type/TServiceLikeResponse';


export default class UserService extends BaseService<TUser> implements IUserService  {
  constructor(
    private userModel: IUserModel,
  ) { super(userModel); }
 
  public async login(username:string, password:string){
    const user = await this.userModel.getWithAllAssociationsByUsername(username);
    if(!user || password !== user.password){
      throw new AppResponseError('Usuário ou senha inválidos');
    }
    user.password = ''; 
    return user;
  }

  public async register(username:string, password:string){
    const user = await this.userModel.getWithAllAssociationsByUsername(username);

    if(user){
      throw new AppResponseError('Esse nome de usuário já existe');
    }
    return await this.userModel.create({username, password, name:'', phone:''});
  }

  public async update(id:string, obj:TUser){
    console.log('service user update: ', id) 
    console.log(obj)
    const updatedObj = await this.userModel.update(id, obj);
    console.log(updatedObj)
    const userUpd = await this.userModel.getWithAllAssociationsByUsername(updatedObj.username)
    // const result = await SequelizeImageBlobModel.findAll({
    //   where:{
    //     userId: id,
    //   }
    // });
    if(userUpd) return userUpd;
    // console.log(userUpd)
    // updatedObj.images = result;
    if(userUpd) return userUpd;
    return {} as TUser;
  }
 
  public async findPotentialMatches(username:string) {
    console.log('findpotentialMatches service')
    console.log(username)
    // const loggedUser = await SequelizeUserModel.findOne({where:{id},attributes:['username','id']})
    const loggedUser = await this.userModel.getWithAllAssociationsByUsername(username);

    if(!loggedUser) throw new AppResponseError('fds')
      console.log(loggedUser)
    const result = await this.userModel.findPotentialMatches(loggedUser);
  console.log(result)
    return result;
  }
  
  public async like(userLoggedId: number, userTargetId:number): Promise<TServiceLikeResponse> {
    const loggedUser = await this.userModel.getWithLikesById(userLoggedId)
    const targetUser = await this.userModel.getWithLikesById(userTargetId)
    let isMatch = false;

    if(loggedUser && targetUser){
      // const userLikedUsers = loggedUser.relatedUsers?.map((user) => user.id) ;
      const targetLikedUsers = targetUser.relatedUsers?.map((user) => user.id);
      await SequelizeLikeModel.create({userLoggedId: userLoggedId, userTargetId: userTargetId});

      if(targetLikedUsers?.some((e) => e === userLoggedId )){  
        // await SequelizeLikeModel.create({userLoggedId, userTargetId});
        await SequelizeMatchModel.create({
          firstUserId:Math.min(userLoggedId, userTargetId),
          lastUserId: Math.max(userLoggedId, userTargetId)
        });

        isMatch = true;
      }
      // else if(!userLikedUsers?.some((e)=> e === userTargetId)){
      //   await SequelizeLikeModel.create({userLoggedId, userTargetId});
      // }  
      console.log(loggedUser)
      console.log('------------------------------')
      console.log(targetUser)
      const user = await this.userModel.getWithAllAssociationsByUsername(loggedUser?.username);
      console.log('_______________')
      console.log(user)
      return {user, isMatch} ;
    }
   
    throw new AppResponseError('Usuário não encontrado')
  }

  public async unlike(userLoggedId: number, userTargetId:number): Promise<TUser | null> {
    const loggedUser = await this.userModel.getWithLikesById(userLoggedId)
    const targetUser = await this.userModel.getWithLikesById(userTargetId)

    if(loggedUser && targetUser){      await SequelizeLikeModel.destroy({where:{userLoggedId, userTargetId}}); 
      console.log(loggedUser)
      console.log('------------------------------')
      console.log(targetUser)
      const user = await this.userModel.getWithAllAssociationsByUsername(loggedUser?.username);
      console.log('_______________')
      console.log(user)
      return user ;
    }
   
    throw new AppResponseError('Usuário não encontrado')
    // const loggedUser = await this.userModel.getWithLikesById(userLoggedId)
    // const targetUser = await this.userModel.getWithLikesById(userTargetId)
    
    // if(loggedUser && targetUser){
    //   const relatedUsers = loggedUser.relatedUsers?.map((user) => user.id);
    //   if( relatedUsers?.some((e)=> e === userTargetId)){
    //     await SequelizeLikeModel.destroy({ where: { userLoggedId, userTargetId }})
    //   }
    //   return await this.userModel.getWithAllAssociationsByUsername(loggedUser?.username);
    // }
    
    // throw new AppResponseError('Usuário não encontrado')
  }
  
  public async dislikeToUser(userLoggedId: number, userTargetId:number): Promise<TUser | null > {
    const loggedUser = await this.userModel.getWithLikesById(userLoggedId)
    const targetUser = await this.userModel.getWithLikesById(userTargetId)
    
    if(loggedUser && targetUser){
      await UserDislikeToUser.create({userLoggedId, userTargetId});
      const user =  await this.userModel.getWithAllAssociationsByUsername(loggedUser.username);
      return user;
    }
    throw new AppResponseError('Usuário não encontrado')
  }
  
  public async undislikeToUser(userLoggedId: number, userTargetId:number): Promise<TUser | null> {
    
    const loggedUser = await this.userModel.getWithLikesById(userLoggedId)
    const targetUser = await this.userModel.getWithLikesById(userTargetId)
    
    if(loggedUser && targetUser){ 
      await UserDislikeToUser.destroy({ where: { userLoggedId, userTargetId }})
      const user = await this.userModel.getWithAllAssociationsByUsername(loggedUser.username)
      return user;
    }
   
    return await this.userModel.getWithLikesById(userLoggedId);
  }
} 