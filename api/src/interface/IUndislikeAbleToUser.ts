export interface IUndislikeAbleToUser<T> {
  undislikeToUser(userLoggedId:number, userTargetId:number):Promise<T>,
}
