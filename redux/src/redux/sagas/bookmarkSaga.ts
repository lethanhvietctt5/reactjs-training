import { PayloadAction } from "@reduxjs/toolkit";
import { bookmarkApi } from "api";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { addBookmark, fetchBookmark, removeBookmark, setBookmark } from "redux/slices/bookmark";
import { Bookmark, User } from "types";
import { RootState } from "./../store";

function* getBookmark(action: PayloadAction<User>) {
  try {
    const bookmark: Bookmark = yield call(bookmarkApi.getBookmark, action.payload.id);

    const { id, collections } = bookmark;

    yield put(setBookmark({ id, collections }));
  } catch (err) {
    console.log(err);
  }
}

function* addPostToBookmark(action: PayloadAction<string>) {
  try {
    const id: string = yield select((state: RootState) => state.bookmark.id);
    yield call(bookmarkApi.addBookmark, id, action.payload);
  } catch (err) {
    console.log(err);
  }
}

function* removePostFromBookmark(action: PayloadAction<string>) {
  try {
    const id: string = yield select((state: RootState) => state.bookmark.id);
    yield call(bookmarkApi.removeBookmark, id, action.payload);
  } catch (err) {
    console.log(err);
  }
}

export default function* watcherBookmark() {
  // Watch if login success then fetch bookmark of current user
  yield takeEvery(fetchBookmark.type, getBookmark);

  // Watch when user add new post to bookmark
  yield takeEvery(addBookmark.type, addPostToBookmark);

  // Watch when user remove a post from bookmark list
  yield takeEvery(removeBookmark.type, removePostFromBookmark);
}
