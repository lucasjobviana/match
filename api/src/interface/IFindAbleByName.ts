export interface IFindAbleByName<T> { 
  getWithAllAssociationsByUsername(username:string):Promise<T | null>,
}
