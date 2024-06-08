import { Request, Response } from 'express';

export interface ILikeAbleToUser<T> {  
  like(userLoggedId:number, userTargetId:number):Promise<T>,
}
