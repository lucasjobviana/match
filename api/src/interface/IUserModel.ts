import BaseModel from '../model/BaseModel';
import { IFindAbleById } from './IFindAbleById';
import { IFindAbleByName } from './IFindAbleByName';
import { TUser } from './type/TUser';

export interface IUserModel extends  
  BaseModel<TUser>,
  IFindAbleById<TUser>,
  IFindAbleByName<TUser> {
    findPotentialMatches(user:TUser): Promise<TUser[]>,
    getWithLikesImagesById(id:number): Promise<TUser>
  // login(name:string): Promise<TUser>,
}
