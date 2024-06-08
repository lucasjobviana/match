export interface IBaseService<T> {
  findAllLikeByFieldName(fieldName: string, searchValue: string): Promise<T[]>;
  delete(id: string): Promise<void>;
  update(id: string, obj: T): Promise<T>;
  create(obj: T): Promise<T>;
}