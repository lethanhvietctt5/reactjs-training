import { PayloadAction } from "@reduxjs/toolkit";
import userApi from "api/bookmarkApi";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { addBookmark, fetchBookmark, removeBookmark, setBookmark } from "redux/slices/bookmark";
import Bookmark from "types/bookmark";
import User from "types/user";
import { RootState } from "./../store";

function* getBookmark(action: PayloadAction<User>) {
  try {
    const bookmark: Bookmark = yield call(userApi.getBookmark, action.payload.id);

    const { id, collections } = bookmark;

    yield put(setBookmark({ id, collections }));
  } catch (err) {
    console.log(err);
  }
}

function* addPostToBookmark(action: PayloadAction<string>) {
  try {
    const id: string = yield select((state: RootState) => state.bookmark.id);
    yield call(userApi.addBookmark, id, action.payload);
  } catch (err) {
    console.log(err);
  }
}

function* removePostFromBookmark(action: PayloadAction<string>) {
  try {
    const id: string = yield select((state: RootState) => state.bookmark.id);
    yield call(userApi.removeBookmark, id, action.payload);
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
