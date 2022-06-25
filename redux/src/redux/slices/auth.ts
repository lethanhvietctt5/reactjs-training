import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "types/user";

export interface AuthState {
  logining: boolean;
  failed: boolean;
  currentUser: User;
}

const initState: AuthState = {
  logining: false,
  failed: false,
  currentUser: {
    id: "",
    name: "",
    email: "",
    password: "",
  },
};

export type LoginPayload = {
  email: string;
  password: string;
};

const authSlice = createSlice({
  name: "authenticate",
  initialState: initState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.logining = true;
      state.failed = false;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.logining = false;
      state.failed = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.logining = false;
      state.failed = true;
    },
    setInit: (state) => {
      state.logining = false;
      state.failed = false;
      state.currentUser = {
        id: "",
        name: "",
        email: "",
        password: "",
      };
    },
    logout: (state) => {
      state.currentUser.email = "";
      state.currentUser.name = "";
      state.currentUser.id = "";
    },
  },
});

const authReducer = authSlice.reducer;

export const { login, loginSuccess, loginFailed, setInit, logout } = authSlice.actions;

export default authReducer;
