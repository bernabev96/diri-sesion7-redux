import { useState, useEffect, useContext } from "react";
import type { MenuItem } from '../entities/entities';
import { foodItemsContext } from "../context/foodItemsContext";
import { createOrder } from "../services/ordersApi";
import logger from "../utils/logger";

interface FoodsOrderProps {
    food: MenuItem;
    onReturnToMenu: () => void;
}

function FoodOrder(props: FoodsOrderProps) {
    const [quantity, setQuantity] = useState<string>('1');
    const [totalPrice, setToTalPrice] = useState(props.food.price);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const qtyNumber = quantity === '' ? 0 : Number(quantity);
    const [error, setError] = useState<string | null>(null);
    const [, setIsSent] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const context = useContext(foodItemsContext);
    if(!context){
        throw new Error("FoodOder debe usarse dentro de foodItemsContext.Provider");
    }
    const { setMenuItems } = context;

    useEffect(() => {
        setToTalPrice(qtyNumber * props.food.price);
    }, [qtyNumber, props.food.price]);

    const handleSendOrder = async () => {
        if (!name.trim() || !phone.trim()) {
            setError('Por favor, complete su nombre y teléfono.');
            return;
        }

        const finalQty = Math.max(1, Math.min(props.food.quantity, qtyNumber));
        /*setTimeout(() => {
            setMenuItems(prev =>
                prev.map(item => {
                    if(item.id !== props.food.id){
                        return item;
                    }
                    const newQty = Math.max(0, item.quantity - finalQty);
                    return {...item, quantity: newQty};
                })
            );
            props.onReturnToMenu();
        }, 2000);*/
        setError(null);
        setIsSent(false);
        setIsSending(true);
        try {
            logger.info(`Enviado pedido: ${props.food.name} x${finalQty}`);
            await createOrder({
                customerName: name.trim(),
                customerPhone: phone.trim(),
                foodId: props.food.id.toString(),
                foodName: props.food.name,
                units: finalQty,
                status: "pending",
                createdAt: Date.now(),
            });
            
            //actualizamos el stock local
            setMenuItems(prev =>
                prev.map(item => {
                    if(item.id !== props.food.id){
                        return item;
                    }
                    const newQty = Math.max(0, item.quantity - finalQty);
                    return {...item, quantity: newQty};
                })
            );
            logger.info("Pedido guardado correctamente en Firebase.");
            setIsConfirmed(true);
            setIsSent(true);
            props.onReturnToMenu();
        } catch (err) {
            logger.error("Error al guardar el pedido.");
            setError(err instanceof Error ? err.message : "Error guardando el pedido.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="mx-auto mt-4 max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white">
            <h3 className="text-xl font-bold text-slate-800 p-4 text-center">Pedido: {props.food.name}</h3>
            <img className="h-56 w-full object-cover" src={`${import.meta.env.BASE_URL}images/${props.food.image}`} alt={props.food.name} />
            <p className="px-4 pt-3 text-slate-600">{props.food.desc}</p>
            <p className="px-4 py-2 text-center text-xl font-extrabold text-red-600">Total: {totalPrice}€</p>
            <div className="px-4 py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label htmlFor="quantity" className="sm:w-24 font-semibold text-slate-700">Cantidad</label>
                <input id="quantity" className="flex-1 rounded-md border border-slate-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="number" min={1} max={props.food.quantity} value={quantity} onChange={(e) => {
                    setQuantity(e.target.value);
                    setIsConfirmed(false);
                }} onBlur={() => {
                    if(quantity === ''){
                        setQuantity('1');
                    }else{
                        const safe = Math.max(1, Math.min(props.food.quantity, Number(quantity)));
                        setQuantity(safe.toString());
                    }
                }}/>
            </div>
            <div className="px-4 py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label htmlFor="name" className="sm:w-24 font-semibold text-slate-700">Nombre</label>
                <input id="name" className="flex-1 rounded-md border border-slate-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="text" value={name} onChange={e => {setName(e.target.value); setError('');}} placeholder="Tu nombre"/>
            </div>
            <div className="px-4 py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label htmlFor="phone" className="sm:w-24 font-semibold text-slate-700">Teléfono</label>
                <input id="phone" className="flex-1 rounded-md border border-slate-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400" type="tel" value={phone} onChange={e => {setPhone(e.target.value); setError('');}} placeholder="Tu teléfono"/>
            </div>
            <div className="flex flex-wrap justify-center gap-3 p-4">
                <button className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700 transition disabled:opacity-50" onClick={handleSendOrder} disabled={qtyNumber < 1 || isSending}>
                    {isSending ? "Guardando pedido..." : "Enviar pedido"}
                </button>
                <button className="cursor-pointer rounded-md bg-yellow-400 px-4 py-2 font-bold text-slate-900 hover:bg-yellow-500 transition" onClick={props.onReturnToMenu}>Volver al menú</button>
                {error && (
                    <p className="px-4 pb-2 text-center font-semibold text-red-600">{error}</p>
                )}
                {isSending && (
                    <p className="px-4 pb-2 text-center font-semibold text-slate-600">Guardando pedido...</p>
                )}
            </div>
            {isConfirmed && <p className="pb-4 text-center font-semibold text-emerald-600">¡Pedido enviado! Recibirá un SMS una vez esté listo para recoger.</p>}
        </div>
    );
}

export default FoodOrder;