import React, { useContext, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/core";
import { Input } from "@chakra-ui/core";
import { BiSend } from "react-icons/bi";
import { websocketContext } from "../context/Websocket.context";
import { currentConversationContext } from "../context/CurrentConversation.context";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { websocket } = useContext(websocketContext);
  const { currentConversation } = useContext(currentConversationContext);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const trimmed = message.trim();
      if (!trimmed) {
        return;
      }
      websocket?.send("newMessage", {
        conversation_id: currentConversation,
        message: trimmed,
      });
      setMessage("");
    }
  }

  return (
    <Box width="60%" display="flex" alignItems="center" margin="0 auto">
      <Box width="100%">
        <Flex alignItems="center">
          <Input onChange={onChange} onKeyUp={onKeyUp} value={message} />
          <Box ml={2} color="gray.500">
            <BiSend size={25} />
          </Box>
        </Flex>
        <Text color="gray.500" fontSize="sm">
          Press 'Enter' to send your message
        </Text>
      </Box>
    </Box>
  );
}
