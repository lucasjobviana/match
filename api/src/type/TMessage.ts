import { TMatch } from "./TMatch";
import { TUser } from "./TUser";

export type TMessage = {
  id?: number,
  content: string,
  sender: TUser,
  match: TMatch,
};
