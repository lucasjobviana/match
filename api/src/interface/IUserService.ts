import BaseService from '../service/BaseService';
import { ILikeAbleToUser } from './ILikeAbleToUser';
import { IUnlikeAbleToUser } from './IUnlikeAbleToUser';
import { IDislikeAbleToUser } from './IDislikeAbleToUser';
import { ILogin } from './ILogin';
import { TUser } from '../type';
import { IUndislikeAbleToUser } from './IUndislikeAbleToUser';
import { TServiceLikeResponse } from '../type/TServiceLikeResponse';
 
export interface IUserService extends 
  BaseService<TUser>,
  ILikeAbleToUser<TServiceLikeResponse>,
  IUnlikeAbleToUser<TUser | null>,
  IDislikeAbleToUser<TUser | null>,
  IUndislikeAbleToUser<TUser | null>,
  
  ILogin {
    findPotentialMatches(username:string): Promise<TUser[]>,
    register(username: string, password:string) : Promise<TUser>;
}
