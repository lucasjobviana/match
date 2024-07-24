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
  images?: ImageBlob[],
  matchedUsers?: TUser[],
  messages?:Messages[],
  imageUrls?: string[]
};

type Messages = {
  id: number,
  content: string,
  sender: number,
  match: number,
}

interface ImageBlob {
  id: number;
  fileName: string;
  fileData: ArrayBuffer;
}