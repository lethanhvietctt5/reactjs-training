import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginFailed, LoginPayload, loginSuccess } from "../slices/auth";
import { login } from "../slices/auth";
import authApi from "api/authApi";
import User from "types/user";

function* loginWorker(action: PayloadAction<LoginPayload>) {
  try {
    const res: AxiosResponse<User[]> = yield call(
      authApi.login,
      action.payload.email,
      action.payload.password
    );

    yield put(loginSuccess(res.data[0]));
  } catch (err) {
    console.log(err);
    yield put(loginFailed());
  }
}

export default function* watcherLogin() {
  yield takeEvery(login.type, loginWorker);
}
