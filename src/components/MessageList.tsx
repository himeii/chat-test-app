import React, { useContext, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/core";
import { currentConversationContext } from "../context/CurrentConversation.context";
import { userContext } from "../context/User.context";
import { websocketContext } from "../context/Websocket.context";
import { Message as MessageType } from "../types/Message.type";
import Message from "./Message";

type MessageListProps = {
  messages: MessageType[] | undefined;
};

export default function MessageList({ messages }: MessageListProps) {
  const { user } = useContext(userContext);
  const { currentConversation } = useContext(currentConversationContext);
  const { websocket } = useContext(websocketContext);
  const ref = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    setTimeout(() => ref?.current?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  useEffect(() => {
    scrollToBottom();
    websocket?.addMessageHandler("newMessage", (message) => {
      const data = JSON.parse(message.data);
      const { conversation_id } = data.payload;
      if (conversation_id === currentConversation) {
        scrollToBottom();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {});

  if (!messages) return null;
  return (
    <Box
      height="95%"
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      <Box overflowY="auto">
        <Box width="75%" margin="0 auto">
          {messages.map((message) => {
            return (
              <Message
                key={message.id}
                isMyMessage={message.user.id === user?.id}
                {...message}
              />
            );
          })}
          <div ref={ref} />
        </Box>
      </Box>
    </Box>
  );
}
