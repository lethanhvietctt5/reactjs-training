import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginFailed, LoginPayload, loginSuccess } from "../slices/auth";
import { login } from "../slices/auth";
import authApi from "api/authApi";
import User from "types/user";

function* loginWorker(action: PayloadAction<LoginPayload>) {
  try {
    const user: User | undefined = yield call(
      authApi.login,
      action.payload.email,
      action.payload.password
    );

    if (user) {
      yield put(loginSuccess(user));
    } else {
      throw Error();
    }
  } catch (err) {
    yield put(loginFailed());
  }
}

export default function* watcherLogin() {
  yield takeEvery(login.type, loginWorker);
}
