import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState: User = {
  id: "",
  name: "",
  email: "",
  password: "",
};

const authSlice = createSlice({
  name: "authenticate",
  initialState: initState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.password = "";
    },
    logout: (state) => {
      state.email = "";
      state.name = "";
      state.id = "";
      state.password = "";
    },
  },
});

const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;

export default authReducer;
