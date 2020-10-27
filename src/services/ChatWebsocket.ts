type ChatWebsocketOptions = {
  room_id: number;
  username: string;
  user_id: number | string;
};

type WebSocketMessageHandler =
  | ((this: WebSocket, ev: MessageEvent<any>) => any)
  | null;

type MessageType = "userJoined" | "userLeft" | "roomInfo" | "newMessage";

const WEBSOCKET_URL = "ws://localhost:8080/";

export class ChatWebsocket {
  ws: WebSocket;
  messageHandlers: { [key in MessageType]?: WebSocketMessageHandler[] };

  constructor({ room_id, username, user_id }: ChatWebsocketOptions) {
    this.ws = new WebSocket(
      `${WEBSOCKET_URL}?room_id=${room_id}&user_id=${user_id}&user_name=${username}`
    );
    this.messageHandlers = {};
    this.ws.onmessage = (message) => {
      const eventName: MessageType = JSON.parse(message.data).eventName;
      this.messageHandlers[eventName]?.forEach(
        (handler: WebSocketMessageHandler) => {
          if (handler) {
            handler.call(this.ws, message);
          }
        }
      );
    };
  }

  addMessageHandler = (
    messageType: MessageType,
    callback: (this: WebSocket, ev: MessageEvent<any>) => any
  ) => {
    if (!this.messageHandlers[messageType]) {
      this.messageHandlers[messageType] = [];
    }

    if (!this.messageHandlers[messageType]?.includes(callback)) {
      this.messageHandlers[messageType]?.push(callback);
    }
  };

  close = () => {
    this.ws.close();
  };

  send = (eventName: string, payload: any) => {
    this.ws.send(
      JSON.stringify({
        eventName,
        payload,
      })
    );
  };
}
