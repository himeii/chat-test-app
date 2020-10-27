import React from "react";
import { Box } from "@chakra-ui/core";
import { Message } from "../types/Message.type";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

type ChatBoxProps = {
  messages: Message[] | undefined;
};

export default function ChatBox({ messages }: ChatBoxProps) {
  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <MessageList {...{ messages }} />
      <MessageInput />
    </Box>
  );
}
