import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import AIEditor from './components/AIEditor';
import PeerDashboard from './components/dashboard/PeerDashboard';
import { useEffect } from 'react';
import socket from './hooks/useSocket';
import LandingPage from './components/LandingPage';
import RoadmapGenerator from './components/RoadmapGenerator';
import UserProfile from './components/profile/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutWithNavbar from './components/common/LayoutWithNavbar';
function App() {
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            socket.emit('join-user-id', userId);
            console.log('🧠 Rejoined socket room on load:', userId);
        }
    }, []);
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(LandingPage, {}) }), _jsx(Route, { path: '/login', element: _jsx(Login, {}) }), _jsx(Route, { path: '/register', element: _jsx(Register, {}) }), _jsxs(Route, { element: _jsx(LayoutWithNavbar, {}), children: [_jsx(Route, { path: '/ai-editor', element: _jsx(ProtectedRoute, { children: _jsx(AIEditor, {}) }) }), _jsx(Route, { path: '/roadmap', element: _jsx(ProtectedRoute, { children: _jsx(RoadmapGenerator, {}) }) }), _jsx(Route, { path: '/dashboard', element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: '/peers', element: _jsx(ProtectedRoute, { children: _jsx(PeerDashboard, {}) }) }), _jsx(Route, { path: '/profile', element: _jsx(ProtectedRoute, { children: _jsx(UserProfile, {}) }) }), _jsx(Route, { path: '/editor/:roomId', element: _jsx(ProtectedRoute, { children: _jsx(AIEditor, {}) }) })] })] }) }));
}
export default App;
