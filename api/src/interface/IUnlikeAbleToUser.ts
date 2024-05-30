import { Request, Response } from 'express';

export interface IUnlikeAbleToUser<T> {
  unlike(userLoggedId:number, userTargetId:number):Promise<T>,
}
