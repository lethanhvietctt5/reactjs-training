import { all } from "redux-saga/effects";
import watcherLogin from "./authSaga";

export default function* watchRootSaga() {
  yield all([watcherLogin()]);
}
