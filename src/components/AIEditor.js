import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import socket from '../hooks/useSocket';
import { useParams } from 'react-router-dom';
import { Button, Box, Typography, Stack, TextField, CircularProgress, MenuItem, Snackbar, Alert } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
const languages = [
    { name: 'JavaScript', id: 63, mode: javascript },
    { name: 'Python', id: 71, mode: python },
    { name: 'C++', id: 54, mode: cpp }
];
const AIEditor = () => {
    const [code, setCode] = useState('// Write your code here');
    const [response, setResponse] = useState('');
    const [mode, setMode] = useState('explain');
    const [loading, setLoading] = useState(false);
    const [isDriver, setIsDriver] = useState(true);
    const [canEdit, setCanEdit] = useState(true);
    const [language, setLanguage] = useState(languages[0]);
    const { roomId } = useParams();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL;
    const activeRoomId = roomId || localStorage.getItem('roomId') || 'demo-room';
    const shareUrl = `${window.location.origin}/editor/${roomId}`;
    useEffect(() => {
        socket.on('connect', () => {
            console.log('🧩 Socket connected with ID:', socket.id);
        });
        localStorage.setItem('roomId', activeRoomId);
        socket.emit('join-room', activeRoomId);
        socket.on('code-update', newCode => {
            setCode(newCode);
        });
        socket.on('driver-update', driverSocketId => {
            console.log('🔄 Driver update received. Driver:', driverSocketId);
            console.log('🧑‍💻 This socket:', socket.id);
            setCanEdit(driverSocketId === socket.id);
        });
        socket.emit('request-driver', { roomId: activeRoomId });
        return () => {
            socket.off('code-update');
            socket.off('driver-update');
        };
    }, [activeRoomId]);
    const askAI = async () => {
        setLoading(true);
        try {
            const promptMap = {
                explain: 'Explain what this code does.',
                fix: 'Fix bugs in the following code.',
                refactor: 'Refactor this code for readability and performance'
            };
            const res = await fetch(`${baseUrl}/api/ai/assist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
                },
                body: JSON.stringify({
                    prompt: promptMap[mode],
                    code,
                    language: language.name
                })
            });
            const data = await res.json();
            setResponse(data.response || 'No response from AI');
        }
        catch (err) {
            console.error(err);
            setResponse('AI assistant failed to respond.');
        }
        setLoading(false);
    };
    const runCode = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/code/execute`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
                },
                body: JSON.stringify({
                    code,
                    languageId: language.id
                })
            });
            const data = await res.json();
            setResponse(data.stdout || data.stderr || 'No output');
        }
        catch (err) {
            console.error(err);
            setResponse('Execution failed.');
        }
        setLoading(false);
    };
    return (_jsxs(Box, { sx: {
            p: 3,
            minHeight: '100vh',
            minWidth: '100vw',
            fontFamily: 'monospace',
            color: '#e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 2
        }, children: [_jsx(Typography, { variant: 'h4', sx: {
                    color: '#16f098',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    textShadow: '0 0 10px #16f09888',
                    mb: 1
                }, children: "\u26A1 CodeMentor AI" }), roomId && (_jsxs(Box, { sx: {
                    p: 2,
                    mb: 1,
                    border: '1px solid #16f09833',
                    borderRadius: 2,
                    background: '#121212',
                    boxShadow: 'inset 0 0 8px #16f09822'
                }, children: [_jsx(Typography, { variant: 'body2', sx: { mb: 1, color: '#aaa' }, children: "\uD83D\uDD17 Share this link to collaborate:" }), _jsxs(Stack, { direction: 'row', spacing: 1, children: [_jsx(TextField, { value: shareUrl, fullWidth: true, size: 'small', disabled: true, sx: {
                                    input: {
                                        color: '#16f098',
                                        backgroundColor: '#1e1e1e',
                                        borderRadius: 1,
                                        fontSize: '0.85rem'
                                    }
                                } }), _jsx(Button, { variant: "outlined", size: "small", sx: {
                                    borderColor: '#16f098',
                                    color: '#16f098',
                                    '&:hover': { backgroundColor: '#16f09822' },
                                }, onClick: () => {
                                    navigator.clipboard.writeText(shareUrl);
                                    setSnackbarMsg('📋 Link copied to clipboard!');
                                    setSnackbarSeverity('success');
                                    setSnackbarOpen(true);
                                }, children: "\uD83D\uDCCB Copy" })] })] })), _jsxs(Stack, { direction: 'row', spacing: 1, sx: { mb: 1, flexWrap: 'wrap' }, children: [_jsx(TextField, { select: true, label: 'Language', value: language.name, onChange: e => {
                            const lang = languages.find(l => l.name === e.target.value);
                            if (lang)
                                setLanguage(lang);
                        }, size: 'small', sx: {
                            minWidth: 130,
                            backgroundColor: '#1a1a1a',
                            borderRadius: 1,
                            '& .MuiInputBase-input': { color: '#16f098', fontSize: '0.85rem' },
                            '& .MuiInputLabel-root': { color: '#aaa' }
                        }, children: languages.map(lang => (_jsx(MenuItem, { value: lang.name, children: lang.name }, lang.name))) }), ['explain', 'fix', 'refactor'].map(m => (_jsx(Button, { variant: mode === m ? 'contained' : 'outlined', sx: {
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            px: 2,
                            color: mode === m ? '#000' : '#16f098',
                            backgroundColor: mode === m ? '#16f098' : 'transparent',
                            borderColor: '#16f098',
                            '&:hover': {
                                backgroundColor: '#16f09833'
                            }
                        }, onClick: () => {
                            setMode(m);
                            askAI();
                        }, children: m.toUpperCase() }, m))), _jsx(Button, { variant: 'outlined', size: 'small', color: canEdit ? 'success' : 'warning', onClick: () => socket.emit('set-driver', { roomId: activeRoomId }), sx: { fontWeight: 600 }, children: canEdit ? '🟢 Driver' : '🔒 Request Role' }), _jsx(Button, { variant: 'contained', size: 'small', color: 'success', onClick: askAI, disabled: loading, sx: { fontWeight: 600 }, children: loading ? _jsx(CircularProgress, { size: 16, color: 'inherit' }) : 'Ask AI' }), _jsx(Button, { variant: 'contained', size: 'small', color: 'secondary', onClick: runCode, disabled: loading, sx: { fontWeight: 600 }, children: loading ? (_jsx(CircularProgress, { size: 16, color: 'inherit' })) : ('Run Code') })] }), _jsx(Box, { sx: {
                    border: '1px solid #333',
                    borderRadius: 1,
                    overflow: 'hidden',
                    boxShadow: '0 0 12px #16f09822'
                }, children: _jsx(CodeMirror, { value: code, height: '300px', extensions: [language.mode()], theme: oneDark, editable: canEdit, onChange: val => {
                        setCode(val);
                        if (canEdit) {
                            socket.emit('code-change', {
                                roomId: activeRoomId,
                                code: val
                            });
                        }
                    } }) }), _jsxs(Box, { sx: { mt: 2 }, children: [_jsx(Typography, { variant: 'subtitle2', gutterBottom: true, sx: { color: '#16f098', fontWeight: 600 }, children: "\uD83E\uDDE0 AI Response:" }), _jsx(TextField, { multiline: true, minRows: 6, value: response, fullWidth: true, variant: 'outlined', InputProps: {
                            style: {
                                backgroundColor: '#1e1e1e',
                                color: '#16f098',
                                fontFamily: 'monospace',
                                padding: '16px',
                                borderRadius: '12px',
                                boxShadow: '0 0 10px #16f09844',
                                border: '1px solid #16f09855',
                                transition: '0.3s ease-in-out',
                                fontSize: '0.9rem'
                            }
                        }, sx: {
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#16f09855',
                                    borderWidth: '1px'
                                },
                                '&:hover fieldset': {
                                    borderColor: '#16f098'
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#16f098',
                                    borderWidth: '2px'
                                }
                            },
                            '& .MuiInputBase-input': {
                                color: '#16f098'
                            }
                        } })] }), _jsx(Snackbar, { open: snackbarOpen, autoHideDuration: 3000, onClose: () => setSnackbarOpen(false), anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { severity: snackbarSeverity, variant: 'filled', onClose: () => setSnackbarOpen(false), sx: {
                        backgroundColor: snackbarSeverity === 'success' ? '#16f098' : '#ff4d4f',
                        color: '#000',
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        boxShadow: '0 0 10px'
                    }, children: snackbarMsg }) })] }));
};
export default AIEditor;
