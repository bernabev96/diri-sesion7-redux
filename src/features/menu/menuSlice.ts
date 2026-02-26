import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MenuItem } from "../../entities/entities";

interface MenuState {
    items: MenuItem[];
}

const initialState: MenuState = {
    items: [
      {
        "id": 1,
        "name": "Hamburguesa de pollo",
        "quantity": 40,
        "desc": "Hamburguesa de pollo frito con lechuga, tomate, queso y mayonesa",
        "price": 24,
        "image": "cb.jpg"
      },
      {
        "id": 2,
        "name": "Hamburguesa de ternera",
        "quantity": 30,
        "desc": "Hamburguesa de ternera con lechuga, tomate, queso cheddar fundido y salsa Emmy",
        "price": 25,
        "image": "vb.jpg"
      },
      {
        "id": 3,
        "name": "Patatas fritas caseras",
        "quantity": 50,
        "desc": "Patatas fritas caseras crujientes y saladas",
        "price": 10,
        "image": "chips.jpg"
      },
      {
        "id": 4,
        "name": "Helado de Vainilla",
        "quantity": 30,
        "desc": "Helado de vainilla cremoso y dulce",
        "price": 5,
        "image": "ic.jpg"
      }
    ],
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        updateMenuItemQuantity: (state, actions: PayloadAction<{itemId: number, units: number }>) => {
            const item = state.items.find((i) => i.id === actions.payload.itemId);
            if (!item) {
                return;
            }
            item.quantity = Math.max(0, item.quantity - actions.payload.units);
        },
    },
});

export const { updateMenuItemQuantity } = menuSlice.actions;
export default menuSlice.reducer;