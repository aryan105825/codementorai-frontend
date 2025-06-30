import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL;
    useEffect(() => {
        const fetchAnalytics = async () => {
            const res = await fetch(`${baseUrl}/api/analytics`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const json = await res.json();
            setData(json);
            setLoading(false);
        };
        fetchAnalytics();
    }, []);
    if (loading)
        return _jsx(CircularProgress, { sx: { mt: 4 } });
    const chartData = Object.entries(data.languageCount).map(([lang, count]) => ({
        language: lang,
        count
    }));
    return (_jsxs(Box, { sx: {
            p: 4,
            fontFamily: 'monospace',
            color: '#e0e0e0',
            minHeight: '100vh',
            minWidth: '100vw',
            background: 'linear-gradient(135deg, #0f172a, #000)',
            display: 'grid',
            gap: 4
        }, children: [_jsx(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: _jsx(Typography, { variant: 'h4', gutterBottom: true, sx: {
                        textAlign: 'center',
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #16f098, #4ade80)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 8px #16f09844'
                    }, children: "\uD83D\uDCCA Your Learning Dashboard" }) }), _jsx(motion.div, { whileHover: { scale: 1.02 }, transition: { duration: 0.3 }, children: _jsxs(Paper, { elevation: 3, sx: {
                        p: 3,
                        backgroundColor: 'rgba(18,18,18,0.9)',
                        border: '1px solid #16f09833',
                        boxShadow: '0 0 12px #16f09822',
                        borderRadius: 3,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap',
                        gap: 3,
                        backdropFilter: 'blur(3px)'
                    }, children: [_jsxs(Typography, { sx: { color: '#aaa', fontSize: '1rem' }, children: ["\uD83E\uDDE0 Total Sessions:", ' ', _jsx("strong", { style: { color: '#16f098' }, children: _jsx(CountUp, { end: data.totalSessions, duration: 1.5 }) })] }), _jsxs(Typography, { sx: { color: '#aaa', fontSize: '1rem' }, children: ["\uD83E\uDD16 AI Prompts:", ' ', _jsx("strong", { style: { color: '#16f098' }, children: _jsx(CountUp, { end: data.aiPromptCount, duration: 1.5 }) })] }), _jsxs(Typography, { sx: { color: '#aaa', fontSize: '1rem' }, children: ["\u2699\uFE0F Code Executions:", ' ', _jsx("strong", { style: { color: '#16f098' }, children: _jsx(CountUp, { end: data.executionCount, duration: 1.5 }) })] })] }) }), _jsx(motion.div, { whileHover: { scale: 1.02 }, transition: { duration: 0.3 }, children: _jsxs(Paper, { elevation: 3, sx: {
                        p: 3,
                        backgroundColor: 'rgba(18,18,18,0.9)',
                        border: '1px solid #16f09833',
                        boxShadow: '0 0 12px #16f09822',
                        borderRadius: 3,
                        backdropFilter: 'blur(3px)'
                    }, children: [_jsx(Typography, { variant: 'h6', sx: {
                                mb: 2,
                                color: '#16f098',
                                fontWeight: 'bold',
                                textShadow: '0 0 6px #16f09833'
                            }, children: "\uD83D\uDCBB Languages Used" }), _jsx(ResponsiveContainer, { width: '100%', height: 300, children: _jsxs(BarChart, { data: chartData, children: [_jsx(XAxis, { dataKey: 'language', stroke: '#aaa' }), _jsx(YAxis, { stroke: '#aaa', allowDecimals: false }), _jsx(Tooltip, { contentStyle: {
                                            backgroundColor: '#1e1e1e',
                                            border: '1px solid #16f09855',
                                            color: '#16f098',
                                            fontFamily: 'monospace',
                                            fontSize: '0.85rem'
                                        } }), _jsx(Bar, { dataKey: 'count', fill: '#16f098', radius: [4, 4, 0, 0] })] }) })] }) })] }));
};
export default Dashboard;
