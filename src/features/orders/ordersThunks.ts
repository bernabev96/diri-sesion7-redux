import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, type Order } from "../../services/ordersApi";
import { updateMenuItemQuantity } from "../menu/menuSlice";

export const placeOrder = createAsyncThunk<
Order,
Omit<Order, "id">,
{ rejectValue: string }
>("orders/placeOrder", async (order, { dispatch, rejectWithValue }) => {
    try {
        const saved = await createOrder(order);

        // Actualiza el stock en el menú
        dispatch(updateMenuItemQuantity({ itemId: Number(order.foodId), units: order.units}));
        return saved;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Error al realizar el pedido. Por favor, inténtalo de nuevo.");
    }
});