import { createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "./ordersThunks";

interface OrdersState {
    isSending: boolean;
    error?: string;
    lastOrderId?: string;
    message?: string;
}

const initialState: OrdersState = {
    isSending: false,
    error: undefined,
    lastOrderId: undefined,
    message: undefined,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearOrderState(state){
            state.isSending = false;
            state.error = undefined;
            state.lastOrderId = undefined;
            state.message = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(placeOrder.pending, (state) => {
            state.isSending = true;
            state.error = undefined;
            state.message = "Guardando pedido...";
        })
        .addCase(placeOrder.fulfilled, (state, action) => {
            state.isSending = false;
            state.lastOrderId = action.payload.id;
            state.message = "Pedido guardado con éxito ✅";
        })
        .addCase(placeOrder.rejected, (state, action) => {
            state.isSending = false;
            state.error = action.payload ?? action.error.message ??"Error al realizar el pedido. Por favor, inténtalo de nuevo.";
            state.message = "Error al enviar el pedido ❌";
        });
    },
});

export const { clearOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;