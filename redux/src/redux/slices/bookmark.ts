import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BookmarkState = {
  id: string;
  bookmarks: string[];
};

const initState: BookmarkState = {
  id: "",
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: initState,
  reducers: {
    fetchBookmark: (state, action: PayloadAction<BookmarkState>) => {
      const { id, bookmarks } = action.payload;
      state.id = id;
      state.bookmarks.push(...bookmarks);
      // state.bookmarks.concat(bookmarks);
    },
    addBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter((item) => item !== action.payload);
    },
    resetBoomark: (state) => {
      state.id = "";
      state.bookmarks = [];
    },
  },
});

const bookmarkReducer = bookmarkSlice.reducer;

export const { fetchBookmark, addBookmark, removeBookmark, resetBoomark } = bookmarkSlice.actions;
export default bookmarkReducer;
