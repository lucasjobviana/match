import { NextFunction } from "express";

export interface IReplaceAbleAllImages<T> { 
  replaceAllUserImages(req: Request, res: Response, next:NextFunction): void;
}
