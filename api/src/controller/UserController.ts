import BaseController from './BaseController';
import { TUser } from '../interface';
import { NextFunction, Request, Response } from 'express';
import { ISearchAbleByName } from '../interface/ISearchAbleByName';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import AppResponseError from '../AppResponseError';
import { IUserService } from '../interface/IUserService';

export default class UserController extends BaseController<TUser> implements ISearchAbleByName{
  constructor(
    private userService: IUserService,
  ) { super(userService); }

  public async login(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next:NextFunction){
    const {username, password} = req.body;
    console.log('login user controller')
    console.log(username, password)
    const loggedUser = await this.userService.login(username, password);
    // res.setHeader('Content-Type', 'image/png'); // Ajuste o tipo de conteúdo conforme necessário
    console.log(loggedUser)
    return res.status(200).json(loggedUser);
  }

  public async register(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next:NextFunction){
    const {username, password} = req.body;
    const loggedUser = await this.userService.register(username, password);
    return res.status(200).json(loggedUser);
  }
 
  public async findPotentialMatches(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
    const username = req.headers['username'] as string;
    const users =  await this.userService.findPotentialMatches(username);
    return res.status(200).json(users);
  } 

  public async like(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>):Promise<Response<any, Record<string, any>>>{
    const idLoggedUser = req.headers['user'] as string; // Pegando o ID do usuário logado do cabeçalho
    const {  idTargetUser } = req.body;
    if(idLoggedUser === idTargetUser){
      throw new AppResponseError('Não é possivél se curtir');
    }
    const idLoggedNumber = Number.parseInt(idLoggedUser);
    const idTargetNumber = Number.parseInt(idTargetUser);
    const data = await this.userService.like(idLoggedNumber, idTargetNumber);
    console.log('here +++++')
    console.log(data)
    if(data.isMatch){
      console.log('no if')
      const loggedSocket = req.connectedUsers[idLoggedNumber];  
      const targetSocket = req.connectedUsers[idTargetNumber];

      
        if (loggedSocket) {  
          req.io.to(loggedSocket).emit('match', JSON.stringify( data.isMatch));
        }
        if (targetSocket){
          req.io.to(targetSocket).emit('match', JSON.stringify(data.user))
        }
      
 
      
    }
    console.log('vou retornar')
    console.log(data.user)
    return res.status(200).json(data.user); 
  }

  public async unlike(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>):Promise<Response<any, Record<string, any>>>{
    const idLoggedUser = req.headers['user'] as string; // Pegando o ID do usuário logado do cabeçalho
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
    const idLoggedUser = req.headers['user'] as string; // Pegando o ID do usuário logado do cabeçalho
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
    const idLoggedUser = req.headers['user'] as string; // Pegando o ID do usuário logado do cabeçalho
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
    console.log('upppdateeee connntroollller')
    const { id } = req.params;
    
    const data = req.body;
    const user = {
      name: data.name,
      password: data.password,
      phone: data.phone, 
      username: data.username,
      resume: data.resume
    } as TUser;
    const updatedObject = await this.service.update(id, user);
    return res.status(200).json(updatedObject);
  }
}