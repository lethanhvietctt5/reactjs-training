import { RootState } from "./../store";
import { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { addBookmark, fetchBookmark, removeBookmark } from "redux/slices/bookmark";
import { loginSuccess } from "redux/slices/auth";
import { BookmarkState } from "./../slices/bookmark";
import userApi from "api/userApi";
import User from "types/user";

type BookmarkResponse = {
  id: string;
  user_id: string;
  list_bookmark: string[];
};

function* getBookmark(action: PayloadAction<User>) {
  try {
    const res: AxiosResponse<BookmarkResponse[]> = yield call(
      userApi.getBookmark,
      action.payload.id
    );

    const { id, list_bookmark } = res.data[0];
    const data: BookmarkState = {
      id,
      bookmarks: list_bookmark,
    };
    yield put(fetchBookmark(data));
  } catch (err) {
    console.log(err);
  }
}

function* addPostToBookmark(action: PayloadAction<string>) {
  try {
    let id: string = yield select((state: RootState) => state.bookmark.id);
    yield call(userApi.addBookmark, id, action.payload);
  } catch (err) {
    console.log(err);
  }
}

function* removePostFromBookmark(action: PayloadAction<string>) {
  try {
    let id: string = yield select((state: RootState) => state.bookmark.id);
    yield call(userApi.removeBookmark, id, action.payload);
  } catch (err) {}
}

export default function* watcherBookmark() {
  // Watch if login success then fetch bookmark of current user
  yield takeEvery(loginSuccess.type, getBookmark);

  // Watch when user add new post to bookmark
  yield takeEvery(addBookmark.type, addPostToBookmark);

  // Watch when user remove a post from bookmark list
  yield takeEvery(removeBookmark.type, removePostFromBookmark);
}
