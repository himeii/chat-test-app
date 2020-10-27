import React from "react";
import { Conversation } from "../types/Conversation.type";
import ConversationBox from "./ConversationBox";

type ConversationListProps = {
  conversations: Conversation[];
};

export default function ConversationList({
  conversations,
}: ConversationListProps) {
  return (
    <div>
      {conversations.map((conversation) => {
        return <ConversationBox key={conversation.id} {...conversation} />;
      })}
    </div>
  );
}
