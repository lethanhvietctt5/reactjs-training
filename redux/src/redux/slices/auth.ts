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
      state.currentUser.email = action.payload.email;
      state.currentUser.name = action.payload.name;
      state.currentUser.id = action.payload.id;
      state.currentUser.password = "";
    },
    loginFailed: (state) => {
      state.logining = false;
      state.failed = true;
    },
    logout: (state) => {
      state.currentUser.email = "";
      state.currentUser.name = "";
      state.currentUser.id = "";
      state.currentUser.password = "";
    },
  },
});

const authReducer = authSlice.reducer;

export const { login, loginSuccess, loginFailed, logout } = authSlice.actions;

export default authReducer;
