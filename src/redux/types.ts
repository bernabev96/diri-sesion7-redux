import { combineReducers } from "@reduxjs/toolkit";
import menuReducer from "../features/menu/menuSlice";
import ordersReducer from "../features/orders/ordersSlice";

export const rootReducer = combineReducers({
    menu: menuReducer,
    orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;