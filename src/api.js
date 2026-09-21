// This file is the ONLY place that talks directly to the backend server.
// All other files (AuthContext, OrdersContext) call these simple functions.

// While developing on your own computer, the backend runs on localhost:5000.
// When you deploy the real website later, change this to your live backend URL
// (e.g. "https://printer-shop-backend.onrender.com/api").
const BASE_URL = "http://localhost:5000/api";

// Small helper to send requests and handle errors in one place
async function request(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...options.headers },
    });

    const data = await res.json();

    if (!res.ok) {
        // backend sends { message: "..." } when something goes wrong
        throw new Error(data.message || "Something went wrong.");
    }

    return data;
}

export function signupApi({ name, email, password }) {
    return request("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });
}

export function loginApi({ email, password }) {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

// STEP 1: tell our backend to start a PayPal order (no payment yet)
export function createPaypalOrderApi({ total }, token) {
    return request("/orders/create-paypal-order", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ total }),
    });
}

// STEP 2: after the customer approves payment in the PayPal popup,
// ask our backend to verify it with PayPal and save the order
export function capturePaypalOrderApi({ paypalOrderId, items, total }, token) {
    return request("/orders/capture-paypal-order", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ paypalOrderId, items, total }),
    });
}

export function getMyOrdersApi(token) {
    return request("/orders", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
}

// Contact form — no login required
export function submitContactFormApi({ name, email, phone, subject, message }) {
    return request("/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, subject, message }),
    });
}

// Book an appointment — no login required
export function bookAppointmentApi({ name, email, phone, serviceType, date, timeSlot, notes }) {
    return request("/appointments", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, serviceType, date, timeSlot, notes }),
    });
}
