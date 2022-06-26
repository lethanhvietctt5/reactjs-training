import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import watchRootSaga from "./sagas/rootSaga";
import bookmarkReducer from "./slices/bookmark";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(watchRootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
