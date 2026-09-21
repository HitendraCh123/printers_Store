import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getMyOrdersApi, createPaypalOrderApi, capturePaypalOrderApi } from "../api";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
    const { user, token } = useAuth();
    const [orders, setOrders] = useState([]);

    // Whenever the logged-in user changes (login/logout/signup), load their orders from the backend
    useEffect(() => {
        if (!user || !token) {
            setOrders([]);
            return;
        }
        getMyOrdersApi(token)
            .then(data => setOrders(data.orders))
            .catch(() => setOrders([]));
    }, [user, token]);

    // STEP 1: start a PayPal order (just tells PayPal the amount, no charge yet)
    async function startPaypalOrder({ total }) {
        const data = await createPaypalOrderApi({ total }, token);
        return data.paypalOrderId;
    }

    // STEP 2: after the customer approves payment in the PayPal popup,
    // verify it with our backend and save the order for real
    async function confirmPaypalOrder({ paypalOrderId, items, total }) {
        const data = await capturePaypalOrderApi({ paypalOrderId, items, total }, token);
        setOrders(prev => [data.order, ...prev]);
        return data.order;
    }

    return (
        <OrdersContext.Provider value={{ orders, startPaypalOrder, confirmPaypalOrder }}>
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrders() {
    return useContext(OrdersContext);
}
