export interface IUnlikeAbleToUser<T> {
  unlike(userLoggedId:number, userTargetId:number):Promise<T>,
}
