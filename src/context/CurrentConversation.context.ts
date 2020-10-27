import React, { useCallback, useState } from "react";

export type CurrentConversationContext = {
  currentConversation: string;
  setCurrentConversation: (currentConversation: string) => void;
};

const defaultContextValue = {
  currentConversation: "",
  setCurrentConversation: () => {},
};

export const currentConversationContext = React.createContext<
  CurrentConversationContext
>(defaultContextValue);

export function useCurrentConversation(): CurrentConversationContext {
  const [currentConversation, setCurrentCurrentConversation] = useState<string>(
    ""
  );

  const setCurrentConversation = useCallback((currentConversation: string) => {
    setCurrentCurrentConversation(currentConversation);
  }, []);

  return {
    currentConversation,
    setCurrentConversation,
  };
}
