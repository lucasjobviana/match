import { TUser } from "./TUser";

export type TMatch = {
  firstUserId?: number,
  lastUserId?: number,
  matchedUser: TUser
};
