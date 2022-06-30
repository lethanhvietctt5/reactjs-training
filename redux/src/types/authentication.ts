import { User } from "./user";

export type Authentication = {
  logining: boolean;
  failed: boolean;
  currentUser: User | undefined;
  access_token?: string;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export type AuthResponse = {
  user?: User;
  access_token?: string;
  message?: string;
};
