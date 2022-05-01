import React, { useContext } from "react";
import { IUser } from "./services/api";

export interface IAuthContext {
  user: IUser;
  onSignOut: () => void;
}

export const authContext = React.createContext<IAuthContext>({
  user: {
    nome: "Anonimo",
    email: "",
  },
  onSignOut: () => {},
});

export function useAuthContext() {
  return useContext(authContext);
}
