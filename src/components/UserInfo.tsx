import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/core";
import { BiUserCircle } from "react-icons/bi";
import { userContext } from "../context/User.context";

export default function UserInfo() {
  const { user } = useContext(userContext);
  return (
    <Box
      borderTop="1px"
      borderTopColor="gray.300"
      display="flex"
      alignItems="center"
      width="100%"
      padding={4}
    >
      <Box mr={4}>
        <BiUserCircle size={40} />
      </Box>
      <Text fontSize="lg">{user?.name}</Text>
    </Box>
  );
}
