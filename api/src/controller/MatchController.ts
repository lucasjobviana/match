import BaseController from './BaseController';
import { TMatch } from '../interface';
import BaseService from '../service/BaseService';
 
export default class MatchController extends BaseController<TMatch>{
  constructor(
    private matchService: BaseService<TMatch>,
  ) { super(matchService); }
} 