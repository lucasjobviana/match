import { TImageBlob } from "./TImageBlob";

export type TUser = {
  id?: number,
  name: string,
  username: string,
  password: string,
  phone: string,
  resume?: string,
  likeTo?: number[],
  relatedUsers?: TUser[],
  dislikeUsers?: TUser[],
  matchedUsers?: TUser[],
  images?: TImageBlob[]
};
