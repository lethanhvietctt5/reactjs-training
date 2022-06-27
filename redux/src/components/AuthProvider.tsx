import authApi from "api/authApi";
import { AuthContext } from "context/auth";
import { useAppDispatch } from "hooks";
import useCustomToast from "hooks/useCustomToast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBookmark, resetBoomark } from "redux/slices/bookmark";
import User from "types/user";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
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
    dispatch(resetBoomark());
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

export default AuthProvider;
