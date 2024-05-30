import { Request, Response } from 'express';

export interface IUndislikeAbleToUser<T> {
  undislikeToUser(userLoggedId:number, userTargetId:number):Promise<T>,
}
