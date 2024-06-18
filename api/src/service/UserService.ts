import BaseService from './BaseService';
import { IUserModel, TUser } from '../interface';
import SequelizeLikeModel from '../database/models/UserLikeToUser';
import AppResponseError from '../AppResponseError';
import UserDislikeToUser from '../database/models/UserDislikeToUser';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IUserService } from '../interface/IUserService';
import { TServiceLikeResponse } from '../type/TServiceLikeResponse';


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
    const updatedObj = await this.userModel.update(id, obj);
    const userUpd = await this.userModel.getWithAllAssociationsByUsername(updatedObj.username)

    if(userUpd) return userUpd; 

    return {} as TUser;
  }
 
  public async findPotentialMatches(username:string) {
    const loggedUser = await this.userModel.getWithAllAssociationsByUsername(username);

    if(!loggedUser) throw new AppResponseError('fds')
   
    // const result = await this.userModel.findPotentialMatches(loggedUser);
    const result = await this.userModel.findNextPotentialMatch(loggedUser);

    return result;
  }
  
  public async like(userLoggedId: number, userTargetId:number): Promise<TServiceLikeResponse> {
    const loggedUser = await this.userModel.getWithLikesById(userLoggedId)
    const targetUser = await this.userModel.getWithLikesImagesById(userTargetId)
    let isMatch: TUser|null = null;

    if(loggedUser && targetUser){
      const targetLikedUsers = targetUser.relatedUsers?.map((user) => user.id);
      await SequelizeLikeModel.create({userLoggedId, userTargetId});

      if(targetLikedUsers?.some((e) => e === userLoggedId )){  

        await SequelizeMatchModel.create({
          firstUserId:Math.min(userLoggedId, userTargetId),
          lastUserId: Math.max(userLoggedId, userTargetId)
        });

        isMatch = targetUser; 
      }

      const user = await this.userModel.getWithAllAssociationsByUsername(loggedUser?.username);
      return {user, isMatch} ;
    }
   
    throw new AppResponseError('Usuário não encontrado')
  }

  public async unlike(userLoggedId: number, userTargetId:number): Promise<TUser | null> {
    const loggedUser = await this.userModel.getWithLikesById(userLoggedId)
    const targetUser = await this.userModel.getWithLikesById(userTargetId)

    if(loggedUser && targetUser){      await SequelizeLikeModel.destroy({where:{userLoggedId, userTargetId}}); 
      const user = await this.userModel.getWithAllAssociationsByUsername(loggedUser?.username);
      return user ;
    }
   
    throw new AppResponseError('Usuário não encontrado')
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