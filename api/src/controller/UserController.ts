import BaseController from './BaseController';
import { TUser } from '../interface';
import { NextFunction, Request, Response } from 'express';
import { ISearchAbleByName } from '../interface/ISearchAbleByName';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import AppResponseError from '../AppResponseError';
import { IUserService } from '../interface/IUserService';
import { IMatchService } from '../interface/IMatchService';
import { INewMatchService } from '../interface/INewMatchService';

export default class UserController extends BaseController<TUser> implements ISearchAbleByName{
  constructor(
    private userService: IUserService,
    private matchService: IMatchService,
    private newMatchService: INewMatchService,
  ) { super(userService); }

  public async login(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next:NextFunction){
    const {username, password} = req.body;
    const loggedUser = await this.userService.login(username, password);
    return res.status(200).json(loggedUser);
  }

  public async register(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next:NextFunction){
    const {username, password} = req.body;
    const loggedUser = await this.userService.register(username, password);
    return res.status(200).json(loggedUser);
  } 
  
  public async findPotentialMatches(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
    const username = req.headers['username'] as string;
    // const nextPotentialUser =  await this.userService.findPotentialMatches(username);
    const nextPotentialUser = await this.userService.findPotentialMatches(username);
    return res.status(200).json(nextPotentialUser); 
  }  

  public async findAllMatchesById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>>{
    const id = req.headers['id'] as string;
    const userMatches = await this.matchService.findAllMatchesById(Number(id));
    // const newMatchUsers = await this.newMatchService.findAllLikeByFieldName('userId',id);
     
    // if(newMatchUsers.length > 0){
    //  newMatchUsers.map(async (user)=>{
    //     const loggedSocket = req.connectedUsers[id]; 
    //     const newMatchUser = userMatches.find((m)=>m.id === user.targetId);

    //     if (loggedSocket) {  
    //       await this.newMatchService.delete(id);
    //       setTimeout(()=>{ 
    //         req.io.to(loggedSocket).emit('match', JSON.stringify( {
    //           id:newMatchUser?.id,
    //         }));
    //       },2000);
    //     }
    //   });
    // }
    console.log('controler           -----------')
    console.log(userMatches[0].messages)
    return  res.status(200).json(userMatches);
  }

  public async like(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>):Promise<Response<any, Record<string, any>>>{
    const idLoggedUser = req.headers['user'] as string; 
    const {  idTargetUser } = req.body;
    if(idLoggedUser === idTargetUser){
      throw new AppResponseError('Não é possivél se curtir');
    }
    const idLoggedNumber = Number.parseInt(idLoggedUser);
    const idTargetNumber = Number.parseInt(idTargetUser);
    const data = await this.userService.like(idLoggedNumber, idTargetNumber);

    if(data.isMatch){
      const loggedSocket = req.connectedUsers[idLoggedNumber];  
      const targetSocket = req.connectedUsers[idTargetNumber];

      loggedSocket ? req.io.to(loggedSocket).emit('match', JSON.stringify(data.isMatch))
      : await this.newMatchService.create({userId:idLoggedNumber,targetId:idTargetNumber});

      targetSocket ? req.io.to(targetSocket).emit('match', JSON.stringify(data.user))
      : await this.newMatchService.create({userId:idTargetNumber, targetId:idLoggedNumber})
    }

    return res.status(200).json(data.user); 
  }

  public async unlike(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>):Promise<Response<any, Record<string, any>>>{
    const idLoggedUser = req.headers['user'] as string; 
    const {  idTargetUser } = req.body;
    if(idLoggedUser === idTargetUser){
      throw new AppResponseError('Não é possivél se descurtir');
    } 
    const idLoggedNumber = Number.parseInt(idLoggedUser);
    const idTargetNumber = Number.parseInt(idTargetUser);
    const data = await this.userService.unlike(idLoggedNumber, idTargetNumber);
    return res.status(200).json(data);
  }

  public async dislike(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>):Promise<Response<any, Record<string, any>>>{
    const idLoggedUser = req.headers['user'] as string; 
    const {  idTargetUser } = req.body;
    if(idLoggedUser === idTargetUser){
      throw new AppResponseError('Não é possivél se descurtir');
    }
    const idNumber = Number.parseInt(idLoggedUser);
    const idTargetNumber = Number.parseInt(idTargetUser);
    const data = await this.userService.dislikeToUser(idNumber, idTargetNumber);
    return res.status(200).json(data);
  }

  public async undislike(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>):Promise<Response<any, Record<string, any>>>{
    const idLoggedUser = req.headers['user'] as string; 
    const {  idTargetUser } = req.body;
    if(idLoggedUser === idTargetUser){
      throw new AppResponseError('Não é possivél se curtir');
    }
    const idNumber = Number.parseInt(idLoggedUser);
    const idTargetNumber = Number.parseInt(idTargetUser);
    const data = await this.userService.undislikeToUser(idNumber, idTargetNumber);
    return res.status(200).json(data);
  }
 
  public async update(req: Request, res:Response) {
    const { id } = req.params;
    const data = req.body;
    const updatedObject = await this.service.update(id, data);
    return res.status(200).json(updatedObject);
  }
}