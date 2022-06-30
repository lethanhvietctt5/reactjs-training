import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context/auth";
import { fetchBookmark, resetBoomark } from "redux/slices/bookmark";
import { useAppDispatch, useCustomToast } from "hooks";
import { AuthResponse, User } from "types";
import { authApi } from "api";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [logining, setLogining] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { toastError } = useCustomToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchBookmark(currentUser));
    }
  }, [currentUser, dispatch]);

  function login(email: string, password: string) {
    setLogining(true);
    authApi.login(email, password).then((authRes: AuthResponse) => {
      setLogining(false);

      const { user, message, access_token } = authRes;
      console.log(authRes);
      if (message) {
        setFailed(true);
        toastError(message);
      }
      if (user && access_token) {
        setCurrentUser(user);
        setAccessToken(access_token);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_id", user.id);
        setFailed(false);
        dispatch(fetchBookmark(user));
        navigate("/");
      }
    });
  }

  function logout() {
    setCurrentUser(undefined);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    dispatch(resetBoomark());
  }

  function authenticate() {
    const access_token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    if (access_token && user_id) {
      authApi.auth(access_token, user_id).then((user) => {
        setCurrentUser(user);
        setAccessToken(access_token);
      });
    }
  }

  const ctxValue = {
    logining,
    failed,
    currentUser,
    access_token: accessToken,
    login,
    logout,
    authenticate,
  };

  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
