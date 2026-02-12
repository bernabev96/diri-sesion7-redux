import { createContext } from "react";
import type { MenuItem } from "../entities/entities";

export type FoodItemsContextType = {
    menuItems: MenuItem[];
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

export const foodItemsContext = createContext<FoodItemsContextType>({
    menuItems: [],
    setMenuItems: () => {},
})