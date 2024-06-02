import { TImageBlob } from './type';
 
export interface IImageService{
  replaceAllUserImages(id:number, files:TImageBlob[]):void
}