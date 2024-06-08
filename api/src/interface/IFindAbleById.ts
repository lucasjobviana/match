export interface IFindAbleById<T> { 
  getWithLikesById(id:number):Promise<T|null>,
}
