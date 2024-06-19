
import { TMatch } from '../type';
import BaseModel from '../model/BaseModel';

export interface IMatchModel extends 
  BaseModel<TMatch> {
    findAllMatchesById(id:number): Promise<TMatch[]>,
}
