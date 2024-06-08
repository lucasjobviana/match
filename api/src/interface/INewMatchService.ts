import { Request, Response } from 'express';
import BaseService from '../service/BaseService';
import { ILikeAbleToUser } from './ILikeAbleToUser';
import { IUnlikeAbleToUser } from './IUnlikeAbleToUser';
import { IDeslikeAbleToUser as IDislikeAbleToUser } from './IDeslikeAbleToUser';
import { ILogin } from './ILogin';
import { TMatch, TNewMatch, TUser } from './type';
import { IUndislikeAbleToUser } from './IUndislikeAbleToUser';
import { TServiceLikeResponse } from './type/TServiceLikeResponse';
//BaseService<TUser> & ILikeAbleToUser<TUser> & IDislikeAbleToUser<TUser>
export interface INewMatchService extends 
  BaseService<TNewMatch> {
  
}
