import { Request, Response } from 'express';
import BaseService from '../service/BaseService';
import { ILikeAbleToUser } from './ILikeAbleToUser';
import { IUnlikeAbleToUser } from './IUnlikeAbleToUser';
import { IDeslikeAbleToUser as IDislikeAbleToUser } from './IDeslikeAbleToUser';
import { ILogin } from './ILogin';
import { TMatch, TUser } from './type';
import { IUndislikeAbleToUser } from './IUndislikeAbleToUser';
import { TServiceLikeResponse } from './type/TServiceLikeResponse';
//BaseService<TUser> & ILikeAbleToUser<TUser> & IDislikeAbleToUser<TUser>
export interface IMatchService extends 
  BaseService<TMatch> {
    findAllMatchesById(id:number): Promise<TUser[]>,

}
