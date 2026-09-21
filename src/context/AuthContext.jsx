import { createContext, useContext, useState } from "react";
import { signupApi, loginApi } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // We keep the logged-in user's info AND their login token.
    // The token proves to the backend "this is really me" on every request.
    const [user, setUser] = useState(() => {
        const data = localStorage.getItem("printer_current_user");
        return data ? JSON.parse(data) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem("printer_token"));

    function saveSession(user, token) {
        localStorage.setItem("printer_current_user", JSON.stringify(user));
        localStorage.setItem("printer_token", token);
        setUser(user);
        setToken(token);
    }

    // Create a new account — now talks to the real backend
    async function signup({ name, email, password }) {
        try {
            const data = await signupApi({ name, email, password });
            saveSession(data.user, data.token);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    // Log in with existing account — now talks to the real backend
    async function login({ email, password }) {
        try {
            const data = await loginApi({ email, password });
            saveSession(data.user, data.token);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    function logout() {
        localStorage.removeItem("printer_current_user");
        localStorage.removeItem("printer_token");
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
