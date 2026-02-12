import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe("App comida rápida", () => {
    test("muestra 4 productos en la carta inicial con algún stock, imagen y nombre", () => {
        render(<App />);

        //Deben aparecen los 4 nombres
        expect(screen.getByText("Hamburguesa de pollo")).toBeInTheDocument();
        expect(screen.getByText("Hamburguesa de ternera")).toBeInTheDocument();
        expect(screen.getByText("Patatas fritas caseras")).toBeInTheDocument();
        expect(screen.getByText("Helado de Vainilla")).toBeInTheDocument();

        //deben aparecen los stocks
        expect(screen.getByText("#40")).toBeInTheDocument();
        expect(screen.getAllByText("#30")).toHaveLength(2);
        expect(screen.getByText("#50")).toBeInTheDocument();
    });

    test("en Pedir comida se muestra 4 productos y algún precio", async () => {
        render(<App />);
        const user = userEvent.setup();

        //cambiando la vista a Pedir comida
        await user.click(screen.getByRole("button", {name: /Pedir comida/i}));

        //deben aparecen los 4 nombres de los productos
        expect(await screen.findByText("Hamburguesa de pollo")).toBeInTheDocument();
        expect(await screen.findByText("Hamburguesa de ternera")).toBeInTheDocument();
        expect(await screen.findByText("Patatas fritas caseras")).toBeInTheDocument();
        expect(await screen.findByText("Helado de Vainilla")).toBeInTheDocument();

        //deben aparecen las 4 imagenes
        expect(screen.getByAltText("Hamburguesa de pollo")).toBeInTheDocument();
        expect(screen.getByAltText("Hamburguesa de ternera")).toBeInTheDocument();
        expect(screen.getByAltText("Patatas fritas caseras")).toBeInTheDocument();
        expect(screen.getByAltText("Helado de Vainilla")).toBeInTheDocument();

        //deben aparecer los precios
        expect(screen.getByText("24€")).toBeInTheDocument();
        expect(screen.getByText("25€")).toBeInTheDocument();
        expect(screen.getByText("10€")).toBeInTheDocument();
        expect(screen.getByText("5€")).toBeInTheDocument();
    });

    test("en la compra actualizar el precio total al cambiar la cantidad", async () => {
        render(<App />);
        const user = userEvent.setup();

        //ir a la carta
        await user.click(screen.getByRole("button", {name: /Pedir comida/i}));

        //esperamos que cargue el componente con lazy
        const product = await screen.findByText("Hamburguesa de pollo");
        await user.click(product);

        //comprobar precio inicial total es 24€
        expect(screen.getByText("Total: 24€")).toBeInTheDocument();

        //cambiamos la cantidad a 5
        const quantityInput = screen.getByLabelText("Cantidad");
        await user.clear(quantityInput);
        await user.type(quantityInput, "5");

        //comprobar que el total es 120€
        expect(screen.getByText("Total: 120€")).toBeInTheDocument();
    });
})