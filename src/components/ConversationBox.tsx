import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/core";
import { currentConversationContext } from "../context/CurrentConversation.context";
import { Conversation } from "../types/Conversation.type";

export default function ConversationBox({
  name,
  lastMessage,
  id,
}: Conversation) {
  const { currentConversation, setCurrentConversation } = useContext(
    currentConversationContext
  );
  const isCurrentConversation = currentConversation === id;
  return (
    <Box
      padding={4}
      onClick={() => {
        setCurrentConversation(id);
      }}
      cursor="pointer"
      backgroundColor={isCurrentConversation ? "blue.100" : "white"}
    >
      <Text>{name}</Text>
      {lastMessage && (
        <Text fontSize="sm" maxHeight="20px" isTruncated overflow="hidden">
          {lastMessage.user.name}: {lastMessage.message}
        </Text>
      )}
    </Box>
  );
}
