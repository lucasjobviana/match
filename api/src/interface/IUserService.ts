import { Request, Response } from 'express';
import BaseService from '../service/BaseService';
import { ILikeAbleToUser } from './ILikeAbleToUser';
import { IUnlikeAbleToUser } from './IUnlikeAbleToUser';
import { IDeslikeAbleToUser as IDislikeAbleToUser } from './IDeslikeAbleToUser';
import { ILogin } from './ILogin';
import { TUser } from './type';
import { IUndislikeAbleToUser } from './IUndislikeAbleToUser';
import { TServiceLikeResponse } from './type/TServiceLikeResponse';
//BaseService<TUser> & ILikeAbleToUser<TUser> & IDislikeAbleToUser<TUser>
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
