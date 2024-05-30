import { Request, Response } from 'express';

export interface ISearchAbleByName {
  findPotentialMatches(req: Request, res:Response):Promise<Response<any, Record<string, any>>>,
}
