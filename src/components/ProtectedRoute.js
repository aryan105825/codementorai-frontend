import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : _jsx(Navigate, { to: "/", replace: true });
};
export default ProtectedRoute;
