import { createContext } from "react";
import Authentication from "types/authentication";

const initAuthCtxValue: Authentication = {
  logining: false,
  failed: false,
  currentUser: undefined,
  login: () => void 0,
  logout: () => void 0,
};

export const AuthContext = createContext<Authentication>(initAuthCtxValue);
