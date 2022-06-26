import { all } from "redux-saga/effects";
import watcherBookmark from "./bookmarkSaga";

export default function* watchRootSaga() {
  yield all([watcherBookmark()]);
}
