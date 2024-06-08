import { TUser } from "./TUser";

export type TMatch = {
  firstUserId?: number,
  lastUserId?: number,
  matchedUser: TUser
};

export type TNewMatch = {
  userId: number,
  targetId?: number,
  // matchedUser: TUser
};
