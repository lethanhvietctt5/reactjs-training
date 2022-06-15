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
    setAuth: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
