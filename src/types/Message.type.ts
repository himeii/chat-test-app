import { User } from "./User.type";

export type Message = {
  id: string;
  message: string;
  time: number;
  user: User;
};
