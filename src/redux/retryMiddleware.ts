import type { Action, Middleware, ThunkDispatch } from "@reduxjs/toolkit";
import type { RootState } from "./types";
import { placeOrder } from "../features/orders/ordersThunks";

const retryMiddleware: Middleware<
{},
RootState,
ThunkDispatch<RootState, unknown, Action>
> = (storeAPI) => (next) => async (action) => {
    // reintento solo para pedidos fallidos para evitar bucle infinito
    if (placeOrder.rejected.match(action)){
        console.warn("⚠ Pedido fallido. Reintentando en 1 segundo...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        storeAPI.dispatch(placeOrder(action.meta.arg)); // reintenta con los mismos datos
    }

    return next(action);
};

export default retryMiddleware;