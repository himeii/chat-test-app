import React from "react";
import { Box } from "@chakra-ui/core";

type SidebarProps = {
  conversations: React.ReactNode;
  userInfo: React.ReactNode;
};

export default function Sidebar({ conversations, userInfo }: SidebarProps) {
  return (
    <Box
      height="100%"
      width="15%"
      borderRight="1px"
      borderRightColor="gray.300"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      {conversations}
      {userInfo}
    </Box>
  );
}
