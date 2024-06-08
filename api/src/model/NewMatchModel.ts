import BaseModel from './BaseModel';
import { TNewMatch } from '../interface';
import SequelizeNewMatchModel from '../database/models/SequelizeNewMatchModel';
  
export default class NewMatchModel extends BaseModel<TNewMatch>{
  constructor(
  ) { super(SequelizeNewMatchModel,['userId','targetId']);  }

  public async delete(id:string): Promise<void> { 
    await this.model.destroy({where: {userId:id}});
  }
}  