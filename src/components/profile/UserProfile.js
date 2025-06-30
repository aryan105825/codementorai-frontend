import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, List, ListItem, ListItemText, Rating, Divider, } from '@mui/material';
const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token') || '';
    const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await fetch(`${baseUrl}/api/user/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const userData = await userRes.json();
                const fbRes = await fetch(`${baseUrl}/api/mentor/feedback/received`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const fbData = await fbRes.json();
                setUser(userData);
                setFeedbacks(fbData || []);
                setLoading(false);
            }
            catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading)
        return _jsx(CircularProgress, { sx: { mt: 4 } });
    return (_jsxs(Box, { sx: {
            p: 4,
            minHeight: '100vh',
            color: '#e0e0e0',
            fontFamily: 'monospace',
        }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, sx: {
                    color: '#16f098',
                    fontWeight: 'bold',
                    mb: 3,
                    textShadow: '0 0 12px #16f09855',
                }, children: "\uD83E\uDDD1\u200D\uD83D\uDCBB Your Developer Profile" }), _jsxs(Paper, { sx: {
                    p: 3,
                    mb: 4,
                    backgroundColor: '#111',
                    border: '1px solid #16f09844',
                    borderRadius: 3,
                    boxShadow: '0 0 12px #16f09833',
                }, children: [_jsx(Typography, { variant: "subtitle1", sx: { color: '#16f098', mb: 1 }, children: "\uD83C\uDD94 User ID" }), _jsx(Typography, { sx: { mb: 1, wordBreak: 'break-all' }, children: user.id }), _jsx(Divider, { sx: { my: 2, borderColor: '#16f09822' } }), _jsx(Typography, { variant: "subtitle1", sx: { color: '#16f098', mb: 1 }, children: "\uD83D\uDCDB Name" }), _jsx(Typography, { sx: { mb: 1 }, children: user.name || 'Anonymous' }), _jsx(Typography, { variant: "subtitle1", sx: { color: '#16f098', mb: 1 }, children: "\uD83D\uDCE7 Email" }), _jsx(Typography, { sx: { mb: 1 }, children: user.email }), _jsx(Typography, { variant: "subtitle1", sx: { color: '#16f098', mb: 1 }, children: "\uD83C\uDFF7\uFE0F Role" }), _jsx(Typography, { sx: { mb: 1 }, children: user.role }), _jsx(Typography, { variant: "subtitle1", sx: { color: '#16f098', mb: 1 }, children: "\uD83D\uDCC5 Joined" }), _jsx(Typography, { children: new Date(user.createdAt).toLocaleDateString() })] }), _jsx(Typography, { variant: "h6", sx: {
                    color: '#16f098',
                    mb: 2,
                    textShadow: '0 0 8px #16f09844',
                }, children: "\u2B50 Feedback Received" }), feedbacks.length === 0 ? (_jsx(Typography, { color: "#888", fontStyle: "italic", children: "No feedback yet" })) : (_jsx(Paper, { sx: {
                    backgroundColor: '#111',
                    border: '1px solid #16f09822',
                    borderRadius: 3,
                    boxShadow: '0 0 10px #16f09822',
                    p: 2,
                }, children: _jsx(List, { children: feedbacks.map((fb) => (_jsxs(ListItem, { sx: {
                            borderBottom: '1px dashed #16f09822',
                            mb: 1,
                            '&:last-child': { borderBottom: 'none' },
                        }, children: [_jsx(ListItemText, { primary: fb.feedback || 'No comment', secondary: `From: ${fb.fromUser?.name || 'Anonymous'} • ${new Date(fb.createdAt).toLocaleString()}`, primaryTypographyProps: {
                                    color: '#16f098',
                                    fontSize: '0.9rem',
                                }, secondaryTypographyProps: {
                                    color: '#aaa',
                                    fontSize: '0.75rem',
                                } }), _jsx(Rating, { value: fb.rating, readOnly: true, size: "small" })] }, fb.id))) }) }))] }));
};
export default UserProfile;
