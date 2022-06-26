import User from "./user";

type Authentication = {
  logining: boolean;
  failed: boolean;
  currentUser: User | undefined;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export default Authentication;
