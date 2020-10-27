import { Message } from "./Message.type";

export type Conversation = {
  id: string;
  lastMessage: Message;
  name: string;
  type: string;
  conversationMessages: Message[];
};
