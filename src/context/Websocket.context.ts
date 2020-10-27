import React, { useCallback, useState } from "react";
import { ChatWebsocket } from "../services/ChatWebsocket";

export type WebsocketContext = {
  websocket: ChatWebsocket | null;
  setWebsocket: (ws: ChatWebsocket) => void;
};

const defaultContextValue = {
  websocket: null,
  setWebsocket: () => {},
};

export const websocketContext = React.createContext<WebsocketContext>(
  defaultContextValue
);

export function useWebsocket(): WebsocketContext {
  const [websocket, setCurrentWebsocket] = useState<ChatWebsocket | null>(null);

  const setWebsocket = useCallback((ws: ChatWebsocket) => {
    setCurrentWebsocket(ws);
  }, []);

  return {
    websocket,
    setWebsocket,
  };
}
