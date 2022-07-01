import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types";

export interface BookmarkPayload {
  id: string;
  collections: string[];
}

export interface BookmarkState extends BookmarkPayload {
  fetching: boolean;
  failed: boolean;
}

const initState: BookmarkState = {
  id: "",
  collections: [],
  fetching: false,
  failed: false,
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: initState,
  reducers: {
    fetchBookmark: (state, action: PayloadAction<User>) => {
      state.fetching = true;
      state.failed = false;
    },
    setBookmark: (state, action: PayloadAction<BookmarkPayload>) => {
      state.id = "";
      const { id, collections } = action.payload;
      state.id = id;
      state.collections = [...collections];
    },
    addBookmark: (state, action: PayloadAction<string>) => {
      state.collections.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.collections = state.collections.filter((item) => item !== action.payload);
    },
    resetBoomark: (state) => {
      state.id = "";
      state.collections = [];
    },
  },
});

const bookmarkReducer = bookmarkSlice.reducer;

export const { fetchBookmark, addBookmark, removeBookmark, resetBoomark, setBookmark } =
  bookmarkSlice.actions;
export default bookmarkReducer;
