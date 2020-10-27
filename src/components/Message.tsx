import React from "react";
import { Box, Flex, Text } from "@chakra-ui/core";
import { BiCheck } from "react-icons/bi";
import { Message as MessageType } from "../types/Message.type";

type MessageProps = {
  isMyMessage: boolean;
} & MessageType;

function padTime(unit: number) {
  return unit < 10 ? `0${unit}` : unit;
}

export default function Message({
  isMyMessage,
  message,
  time,
  user,
}: MessageProps) {
  const date = new Date(time);
  const hours = padTime(date.getHours());
  const minutes = padTime(date.getMinutes());
  return (
    <Flex justifyContent={isMyMessage ? "flex-end" : "flex-start"}>
      <Box maxW="40%" mb={2}>
        {!isMyMessage && (
          <Text fontSize="sm" mb={1}>
            {user.name}
          </Text>
        )}
        <Box
          py={2}
          px={4}
          borderRadius={6}
          backgroundColor={isMyMessage ? "green.100" : "purple.100"}
          shadow="xs"
          border="1px"
          borderColor="gray.50"
        >
          <Text>{message}</Text>
          <Flex justify="space-between" alignItems="center" mt={2}>
            <Text fontSize="xs">
              {hours}:{minutes}
            </Text>
            {isMyMessage && (
              <Box ml={2} cursor="pointer">
                <BiCheck />
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
