import React, { useCallback, useState } from "react";
import { User } from "../types/User.type";

export type UserContext = {
  user: User | null;
  setUser: (user: User) => void;
};

const defaultContextValue = {
  user: null,
  setUser: () => {},
};

export const userContext = React.createContext<UserContext>(
  defaultContextValue
);

export function useUser(): UserContext {
  const [user, setCurrentUser] = useState<User | null>(null);

  const setUser = useCallback((user: User) => {
    setCurrentUser(user);
  }, []);

  return {
    user,
    setUser,
  };
}
