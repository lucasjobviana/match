import { NextFunction, Request, Response } from "express";

export interface IReplaceAbleAllImages<T> { 
  replaceAllUserImages(req: Request, res: Response, next:NextFunction): void;
}
