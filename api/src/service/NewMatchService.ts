import BaseService from './BaseService';
import { TNewMatch } from '../interface'; 
import BaseModel from '../model/BaseModel';

export default class NewMatchService extends BaseService<TNewMatch> {
  constructor(
    private newMatchModel:BaseModel<TNewMatch>,
  ) { super(newMatchModel); }
}  