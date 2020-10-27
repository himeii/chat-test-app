import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@chakra-ui/core";
import { v4 } from "uuid";
import { useWebsocket, websocketContext } from "../context/Websocket.context";
import { useUser, userContext } from "../context/User.context";
import { ChatWebsocket } from "../services/ChatWebsocket";
import ConversationList from "../components/ConversationList";
import Sidebar from "../components/Sidebar";
import UserInfo from "../components/UserInfo";
import ChatBox from "../components/ChatBox";
import {
  currentConversationContext,
  useCurrentConversation,
} from "../context/CurrentConversation.context";
import { Conversation } from "../types/Conversation.type";

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const history = useHistory<{ username: string }>();
  const { setWebsocket, websocket } = useWebsocket();
  const { setUser, user } = useUser();
  const {
    currentConversation,
    setCurrentConversation,
  } = useCurrentConversation();

  useEffect(() => {
    const username = history.location.state?.username;
    const savedUser = localStorage.getItem("user_id");
    const user_id = savedUser || v4();
    const ws = new ChatWebsocket({
      room_id: 1,
      username,
      user_id,
    });

    localStorage.setItem("user_id", user_id);

    ws.addMessageHandler("roomInfo", (roomInfoMessage) => {
      const data = JSON.parse(roomInfoMessage.data);
      const conversations = data.payload.room.conversations_list;
      setConversations(conversations);
      setCurrentConversation(conversations[0].id);
    });

    ws.addMessageHandler("newMessage", (newMessage) => {
      const data = JSON.parse(newMessage.data);
      const { payload } = data;
      const { conversation_id, message } = payload;
      setConversations((conversations) =>
        conversations.map((conversation) => {
          return conversation.id === conversation_id
            ? {
                ...conversation,
                lastMessage: message,
                conversationMessages: [
                  ...conversation.conversationMessages,
                  message,
                ],
              }
            : conversation;
        })
      );
    });

    setUser({ id: user_id, name: username });
    setWebsocket(ws);

    return () => {
      ws.close();
    };
  }, [history.location.state, setCurrentConversation, setUser, setWebsocket]);

  return (
    <websocketContext.Provider value={{ setWebsocket, websocket }}>
      <userContext.Provider value={{ setUser, user }}>
        <currentConversationContext.Provider
          value={{ currentConversation, setCurrentConversation }}
        >
          <Box height="100vh" width="100vw" display="flex">
            <Sidebar
              conversations={<ConversationList {...{ conversations }} />}
              userInfo={<UserInfo />}
            />
            <ChatBox
              messages={
                conversations.find(
                  (conversation) => conversation.id === currentConversation
                )?.conversationMessages
              }
            />
          </Box>
        </currentConversationContext.Provider>
      </userContext.Provider>
    </websocketContext.Provider>
  );
}
