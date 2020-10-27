import React, { useEffect, useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");

  useEffect(() => {
    localStorage.removeItem("user_id");
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function login() {
    history.push("/chat", {
      username,
    });
  }

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="30%">
        <Text textAlign="center" fontSize="5xl" fontWeight="bold">
          Chat App
        </Text>
        <Input
          onChange={onChange}
          value={username}
          mb={2}
          placeholder="Username"
        />
        <Button
          isDisabled={!username.trim()}
          backgroundColor="green.100"
          isFullWidth
          onClick={login}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
