import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "./loggerMiddleware";
import retryMiddleware from "./retryMiddleware";
import { rootReducer } from "./types";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware, retryMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;