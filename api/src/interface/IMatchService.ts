import BaseService from '../service/BaseService';
import { TMatch, TUser } from '../type';

export interface IMatchService extends 
  BaseService<TMatch> {
    findAllMatchesById(id:number): Promise<TUser[]>,
}
