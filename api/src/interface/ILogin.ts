import { TUser } from '../type';

export interface ILogin {
  login(username:string, password:string):Promise<TUser|null>
}
