import { Request, Response } from 'express';
import BaseService from '../service/BaseService';
import { IBaseController } from '../interface/IBaseController';

export default abstract class BaseController<T> implements IBaseController<T> {
  constructor(
    protected service: BaseService<T>,
  ) { }

  public async findAllLikeByFieldName(fieldName:string, req: Request, res: Response) { 
    const { search } = req.query;
    const data = await this.service.findAllLikeByFieldName(fieldName,search?.toString()||'');
    return res.status(200).json(data);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.delete(id);
    return res.status(204).json({hasDeleted:true});
  }

  public async update(req: Request, res:Response) {
    const { id } = req.params;
    const data = req.body;
    const updatedObject = await this.service.update(id,data);
    return res.status(200).json(updatedObject);
  }

  public async create(req: Request, res:Response) {
    const data = req.body; 
    const createdObject = await this.service.create(data);
    return res.status(201).json(createdObject); 
  }
} 