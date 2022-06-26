import { AuthContext } from "components/Authentication";
import { useContext } from "react";

function useAuthentication() {
  const { currentUser, login, logout, failed } = useContext(AuthContext);
  return {
    currentUser,
    login,
    logout,
    failed,
  };
}

export default useAuthentication;
