import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    useEffect(() => {
        if (token) {
            const storedUser = localStorage.getItem("user");
            if (storedUser)
                setUser(JSON.parse(storedUser));
        }
    }, [token]);
    const login = (newToken, user) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(newToken);
        setUser(user);
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: { user, token, login, logout }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within AuthProvider");
    return context;
};
