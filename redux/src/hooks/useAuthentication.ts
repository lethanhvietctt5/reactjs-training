import { AuthContext } from "context/auth";
import { useContext } from "react";

export function useAuthentication() {
  const { currentUser, login, logout, failed } = useContext(AuthContext);
  return {
    currentUser,
    login,
    logout,
    failed,
  };
}
