export interface IDislikeAbleToUser<T> {
  dislikeToUser(userLoggedId:number, userTargetId:number):Promise<T>,
}
