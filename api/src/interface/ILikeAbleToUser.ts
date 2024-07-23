export interface ILikeAbleToUser<T> {  
  like(userLoggedId:number, userTargetId:number):Promise<T>,
}
