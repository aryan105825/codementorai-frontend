import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
const LayoutWithNavbar = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(Outlet, {})] }));
};
export default LayoutWithNavbar;
