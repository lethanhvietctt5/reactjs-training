import { all } from "redux-saga/effects";
import watcherLogin from "./authSaga";
import watcherBookmark from "./bookmarkSaga";

export default function* watchRootSaga() {
  yield all([watcherLogin(), watcherBookmark()]);
}
