import { Request, Response } from 'express';

export interface IDeslikeAbleToUser<T> {
  dislikeToUser(userLoggedId:number, userTargetId:number):Promise<T>,
}
