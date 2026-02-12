import { firebaseDbUrl } from "../firebase";

export type OrderStatus = "pending" | "done";

export type Order = {
    id?: string;
    customerName: string;
    customerPhone: string;
    foodId: string;
    foodName: string;
    units: number;
    status: OrderStatus;
    createdAt: number;
};

const baseUrl = `${firebaseDbUrl}/orders`;

export async function createOrder(order: Omit<Order, "id">): Promise<Order> {
    const response = await fetch(`${baseUrl}.json`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(order),
    });

    if(!response.ok){
        throw new Error(`Firebase createOrder error: ${response.status} ${response.statusText}`);
    }

    const data: {name: string } = await response.json();
    return {...order, id: data.name };
}