import { Op } from 'sequelize';
import { IBaseModel } from '../interface/IBaseModel';

export default class  BaseModel<T> implements IBaseModel<T> {
  protected model: any;
  protected propNames: string[];

  constructor(model: any, propNames: string[]=['id']) {
    this.model = model;
    this.propNames = propNames;
  }

  private filterToSelectedFields = (obj:any, fields:string[]) => {
    return obj.map((dbObj:any) => {
      const obj:any = {};
      fields.forEach(propName => {
        obj[propName] = dbObj[propName];
      });
      return obj;
    });
  };

  protected async findAll(whereOption = {}, fields = this.propNames): Promise<T[]> {
    const dbData = await this.model.findAll({ ...whereOption });
    return this.filterToSelectedFields(dbData, fields);
  }

  public async findAllLikeByFieldName(fieldName='name', searchValue = '',  fields = this.propNames): Promise<T[]> {
    return this.findAll({
      where: {
        [fieldName]: {
          [Op.like]: `%${searchValue}%`,
        }
      },
    }, fields);
  }

  public async delete(id:string): Promise<void> { 
    await this.model.destroy({where: {id}});
  }

  public async update(id:string, obj:T): Promise<T> {
    console.log('update base model: ',id)
    console.log(obj)
    const updatedObj = await this.model.update(obj, {where: {id}});
    console.log(updatedObj)
    if(updatedObj[0] === 0) {
      throw new Error(`${this.model} not foundable`);
    }
    return obj;
  } 

  public async create(obj:T): Promise<T> {
    const createdObj = await this.model.create(obj);
    return createdObj;
  }
}