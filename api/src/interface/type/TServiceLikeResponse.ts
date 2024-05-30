import { TUser } from ".";

export type TServiceLikeResponse = {
    user: TUser | null,
    isMatch: boolean,
  }