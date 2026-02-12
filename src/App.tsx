import { useState, lazy, Suspense } from 'react'
import './App.css'
import type { MenuItem } from './entities/entities'
import FoodsOrder from './components/FoodsOrder';
import { foodItemsContext } from './context/foodItemsContext';
import ErrorBoundary from './components/ErrorBoundary';

const Foods = lazy(() => import('./components/Foods'));

function App() {
  const [isChooseFoodPage, setIsChooseFoodPage] = useState(false);
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
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
    },
  ]);

  const handleFoodSelected = (food: MenuItem) => {
    setSelectedFood(food);
  }

  const handleReturnToMenu = () => {
    setSelectedFood(null);
    setIsChooseFoodPage(false);
  }

  return (
    <foodItemsContext.Provider value={{menuItems, setMenuItems}}>
      <div className="max-w-4xl mx-auto p-4 text-center bg-white min-h-screen">
        <button className='cursor-pointer mb-4 rounded-md bg-yellow-400 px-4 py-2 text-sm font-extrabold text-slate-900 hover:bg-yellow-500 transition' onClick={() => {setIsChooseFoodPage(!isChooseFoodPage); setSelectedFood(null);}}>{isChooseFoodPage ? 'Disponibilidad' : 'Pedir Comida'}</button>
        <h3 className='text-2xl font-bold text-slate-800 my-4'>Comida rápida online</h3>
        {!isChooseFoodPage && (
          <>
            <h4 className='text-lg font-semibold text-slate-700 mb-2'>Menús</h4>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {menuItems.map((item) => {
              return (
                <li key={item.id} className='flex justify-between items-center rounded-lg border border-slate-200 bg-white p-3'>
                  <p className='font-semibold text-emerald-600'>{item.name}</p>
                  <p className='font-bold text-slate-700'>#{item.quantity}</p>
                </li>
              );
            })}
            </ul>
          </>
        )}
        {isChooseFoodPage && (
          <Suspense fallback={<div>Cargando carta...</div>}>
            <ErrorBoundary fallback={<div className="text-red-600 font-bold">Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.</div>}>
              {!selectedFood ? (
                <Foods foodItem={menuItems} onFoodSelected={handleFoodSelected} />
              ) : (
                <FoodsOrder food={selectedFood}  onReturnToMenu={handleReturnToMenu} />
              )}
            </ErrorBoundary>
          </Suspense>
        )}
      </div>
    </foodItemsContext.Provider>
  );
}

export default App
