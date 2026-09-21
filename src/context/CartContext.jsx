import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    // Load the cart from localStorage on first render, so it survives page refresh
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("printer_cart");
        return saved ? JSON.parse(saved) : [];
    });

    // Whenever the cart changes, save it to localStorage
    useEffect(() => {
        localStorage.setItem("printer_cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(product) {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    }

    function removeFromCart(id) {
        setCart(prev => prev.filter(item => item.id !== id));
    }

    function updateQty(id, qty) {
        if (qty < 1) return removeFromCart(id);
        setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
    }

    function clearCart() {
        setCart([]);
    }

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
