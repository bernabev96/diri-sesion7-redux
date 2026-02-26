import type { MenuItem } from '../entities/entities';

interface FoodsProps {
    foodItem: MenuItem[];
    onFoodSelected: (food: MenuItem) => void;
}

function Foods(props: FoodsProps) {
    return (
        <>
            <h4 className='text-lg font-semibold text-slate-700 mb-1'>Carta</h4>
            <p className='text-sm text-slate-500 mb-4'>Pulse sobre cada producto para añadirlo</p>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {props.foodItem.map((item) => {
                    const outOfStock = item.quantity <= 0;
                    return (
                        <li key={item.id} className={`cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white hover:shadow-lg transition ${outOfStock ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-lg"}`} onClick={() => { if (!outOfStock)props.onFoodSelected(item); }} role='button' tabIndex={0} aria-disabled={outOfStock}>
                            <img className='h-48 w-full object-cover' src={`${import.meta.env.BASE_URL}images/${item.image}`} alt={item.name} />
                            <div className='p-4 text-left'>
                                <p className='font-bold text-slate-800'>{item.name}</p>
                                {outOfStock && (
                                    <span className='text-xs font-bold text-white bg-slate-500 rounded px-2 py-1'>
                                        Sin stock
                                    </span>
                                )}
                                <p className='text-sm text-slate-500 my-1'>{item.desc}</p>
                                <p className='text-right font-extrabold text-red-600'>{item.price}€</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Foods;