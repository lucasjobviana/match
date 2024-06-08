import { Request, Response } from 'express'; 

export interface IBaseController<T> {
  findAllLikeByFieldName(fieldName: string, req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
}
