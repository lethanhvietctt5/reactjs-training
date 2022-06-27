import authApi from "api/authApi";
import { useAppDispatch } from "hooks";
import useCustomToast from "hooks/useCustomToast";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBookmark } from "redux/slices/bookmark";
import Authentication from "types/authentication";
import User from "types/user";

const initAuthCtxValue: Authentication = {
  logining: false,
  failed: false,
  currentUser: undefined,
  login: () => void 0,
  logout: () => void 0,
};

export const AuthContext = createContext<Authentication>(initAuthCtxValue);

type AuthenticationProviderProps = {
  children: React.ReactNode;
};

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [logining, setLogining] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();
  const { toastError } = useCustomToast();
  const dispatch = useAppDispatch();

  function login(email: string, password: string) {
    setLogining(true);
    authApi.login(email, password).then((user) => {
      setLogining(false);
      if (user) {
        setCurrentUser(user);
        setFailed(false);
        dispatch(fetchBookmark(user));
        navigate("/");
      } else {
        setFailed(true);
        toastError("Login failed! Email or Password is wrong.");
      }
    });
  }

  function logout() {
    setCurrentUser(undefined);
  }

  const ctxValue = {
    logining,
    failed,
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
};

export default AuthenticationProvider;
