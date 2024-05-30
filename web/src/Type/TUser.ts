export type TUser = {
  id: number,
  name: string,
  username: string,
  password: string,
  phone: string,
  resume?: string,
  likeTo?: number[],
  relatedUsers?: TUser[],
  dislikeUsers?: TUser[],
  images: ImageBlob[],
  imageUrls?: string[]
};

interface ImageBlob {
  id: number;
  fileName: string;
  fileData: ArrayBuffer;
}