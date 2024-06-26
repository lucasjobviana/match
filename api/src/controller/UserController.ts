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
    const users =  await this.userService.findPotentialMatches(username);
    return res.status(200).json(users); 
  }  

  public async findAllMatchesById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>>{
    const id = req.headers['id'] as string;
    // console.clear()
    console.log('allMatchesbyid: ',id)
    // const matchA = await this.matchService.findAllLikeByFieldName('firstUserId',id);
    // const matchB = await this.matchService.findAllLikeByFieldName('lastUserId',id);
    const matchC = await this.matchService.findAllMatchesById(Number(id));
    const newMatchUsers = await this.newMatchService.findAllLikeByFieldName('userId',id);
    console.log(newMatchUsers);
    console.log(matchC)
    
    if(newMatchUsers.length > 0){
     const a = newMatchUsers.map(async (n)=>{
        const loggedSocket = req.connectedUsers[id]; 
        const newMatchUser = matchC.find((m)=>m.id === n.targetId);
      console.log(newMatchUser)
        if (loggedSocket) {  
          await this.newMatchService.delete(id);
          setTimeout(()=>{ 
            req.io.to(loggedSocket).emit('match', JSON.stringify( {
              id:newMatchUser?.id,
              // name:newMatchUser?.name,
              // resume:newMatchUser?.resume
            }));
          },1000);
        }

      });
      

    }
    // console.log(matchA)
    // console.log(matchB)
    // console.log(matchC)
    // const matchedUsers = [...matchA, ...matchB];
    // console.log(matchedUsers)
    return  res.status(200).json(matchC);
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
        }else {
          await this.newMatchService.create({userId:idLoggedNumber,targetId:idTargetNumber});
        }
        if (targetSocket){
          req.io.to(targetSocket).emit('match', JSON.stringify(data.user))
        }else{
          await this.newMatchService.create({userId:idTargetNumber,targetId:idLoggedNumber});
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