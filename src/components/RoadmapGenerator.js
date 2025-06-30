import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { Box, Button, Typography, Stack, TextField, CircularProgress, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
const languages = ['JavaScript', 'Python', 'C++', 'Java', 'Go', 'Rust'];
const goals = [
    'Web Development',
    'Data Structures & Algorithms',
    'AI/ML',
    'Competitive Programming',
    'Game Development',
    'Mobile App Development'
];
const RoadmapGenerator = () => {
    const [language, setLanguage] = useState(languages[0]);
    const [goal, setGoal] = useState(goals[0]);
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const roadmapRef = useRef(null);
    const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL;
    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/ai/assist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
                },
                body: JSON.stringify({
                    prompt: `Create a step-by-step learning roadmap for mastering ${language} for ${goal}. Include concepts, tools, and resources.`,
                    code: '',
                    language
                })
            });
            const data = await res.json();
            setResponse(data.response || 'No roadmap returned.');
        }
        catch (err) {
            console.error(err);
            setResponse('Failed to get roadmap.');
        }
        setLoading(false);
    };
    const handleDownload = () => {
        if (!roadmapRef.current)
            return;
        html2pdf()
            .set({
            margin: 0.5,
            filename: `${language}-${goal}-roadmap.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
            .from(roadmapRef.current)
            .save();
    };
    return (_jsxs(Box, { sx: {
            p: 4,
            minHeight: '100vh',
            color: '#e0e0e0',
            fontFamily: 'monospace',
        }, children: [_jsx(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: _jsx(Typography, { variant: 'h4', gutterBottom: true, sx: {
                        textAlign: 'center',
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #16f098, #4ade80)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 8px #16f09844',
                        mb: 4,
                    }, children: "\uD83E\uDDED AI-Powered Learning Roadmap" }) }), _jsxs(Stack, { spacing: 3, direction: 'row', sx: { mb: 4, flexWrap: 'wrap', justifyContent: 'center' }, children: [_jsx(TextField, { select: true, label: 'Language', value: language, onChange: (e) => setLanguage(e.target.value), sx: {
                            minWidth: 200,
                            backgroundColor: '#1a1a1a',
                            color: '#fff',
                            '& .MuiInputBase-input': { color: '#16f098' },
                            '& .MuiInputLabel-root': { color: '#aaa' },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '& fieldset': { borderColor: '#16f09844' },
                                '&:hover fieldset': { borderColor: '#16f09888' },
                                '&.Mui-focused fieldset': { borderColor: '#16f098' },
                            },
                        }, children: languages.map((lang) => (_jsx(MenuItem, { value: lang, children: lang }, lang))) }), _jsx(TextField, { select: true, label: 'Goal', value: goal, onChange: (e) => setGoal(e.target.value), sx: {
                            minWidth: 250,
                            backgroundColor: '#1a1a1a',
                            color: '#fff',
                            '& .MuiInputBase-input': { color: '#16f098' },
                            '& .MuiInputLabel-root': { color: '#aaa' },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '& fieldset': { borderColor: '#16f09844' },
                                '&:hover fieldset': { borderColor: '#16f09888' },
                                '&.Mui-focused fieldset': { borderColor: '#16f098' },
                            },
                        }, children: goals.map((g) => (_jsx(MenuItem, { value: g, children: g }, g))) }), _jsx(Button, { variant: 'contained', onClick: handleGenerate, disabled: loading, sx: {
                            background: 'linear-gradient(90deg, #16f098, #4ade80)',
                            color: '#000',
                            fontWeight: 'bold',
                            px: 3,
                            borderRadius: 2,
                            boxShadow: '0 0 10px #16f09855',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #14e68d, #22c55e)',
                                boxShadow: '0 0 14px #14e68d77',
                            },
                        }, children: loading ? _jsx(CircularProgress, { size: 20, color: 'inherit' }) : '🚀 Generate' })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 }, children: _jsx(Box, { ref: roadmapRef, sx: {
                        backgroundColor: 'rgba(18,18,18,0.9)',
                        border: '1px solid #16f09833',
                        borderRadius: 3,
                        boxShadow: '0 0 12px #16f09822',
                        p: 3,
                        whiteSpace: 'pre-wrap',
                        backdropFilter: 'blur(3px)',
                        mb: 3,
                        minHeight: '200px',
                    }, children: response || '💡 No roadmap generated yet.' }) }), _jsxs(Stack, { spacing: 2, direction: 'row', justifyContent: 'center', flexWrap: 'wrap', children: [_jsx(Button, { variant: 'outlined', onClick: () => {
                            const blob = new Blob([response], { type: 'text/markdown' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `${language}-${goal}-roadmap.md`;
                            link.click();
                            URL.revokeObjectURL(url);
                        }, sx: {
                            borderColor: '#16f09855',
                            color: '#16f098',
                            '&:hover': {
                                borderColor: '#16f098',
                                backgroundColor: '#16f09811',
                            },
                        }, children: "\uD83D\uDCDD Download Markdown" }), _jsx(Button, { variant: 'outlined', onClick: handleDownload, sx: {
                            borderColor: '#16f09855',
                            color: '#16f098',
                            '&:hover': {
                                borderColor: '#16f098',
                                backgroundColor: '#16f09811',
                            },
                        }, children: "\uD83D\uDCC4 Download PDF" })] })] }));
};
export default RoadmapGenerator;
