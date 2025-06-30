import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Container, Stack, TextField, Typography, Paper, List, ListItem, ListItemText, Snackbar, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MentorFeedbackDialog from '../mentor/MentorFeedbackDialog';
const PeerDashboard = () => {
    const [email, setEmail] = useState('');
    const [pending, setPending] = useState([]);
    const [peers, setPeers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
    const [selectedPeerId, setSelectedPeerId] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token') || '';
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL;
    const randomSessionId = Math.random().toString(36).substring(2, 10);
    const fetchRequests = async () => {
        const res = await fetch(`${baseUrl}/api/peer/my`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setPending(data || []);
    };
    const fetchPeers = async () => {
        const res = await fetch(`${baseUrl}/api/peer/my-peers`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setPeers(data || []);
    };
    useEffect(() => {
        fetchRequests();
        fetchPeers();
    }, []);
    const sendInvite = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/peer/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ toEmail: email })
            });
            const data = await res.json();
            setSnackbarMsg(data.message || 'Invite sent');
            setSnackbarSeverity(res.ok ? 'success' : 'error');
            setSnackbarOpen(true);
            setEmail('');
        }
        catch (err) {
            console.error(err);
            setSnackbarMsg('Something went wrong');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        setLoading(false);
    };
    const acceptInvite = async (requestId, roomId) => {
        try {
            const res = await fetch(`${baseUrl}/api/peer/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ requestId })
            });
            const data = await res.json();
            setSnackbarMsg(data.message || 'Joined session');
            setSnackbarSeverity(res.ok ? 'success' : 'error');
            setSnackbarOpen(true);
            if (res.ok) {
                localStorage.setItem('roomId', data.roomId);
                navigate(`/editor/${data.roomId}`);
            }
        }
        catch (err) {
            console.error(err);
            setSnackbarMsg('Something went wrong');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };
    return (_jsxs(Container, { maxWidth: 'sm', sx: {
            mt: { xs: 15, md: 12, lg: 12, xl: 14 },
            minWidth: '100vw',
            fontFamily: 'monospace',
            color: '#e0e0e0',
            display: 'flex',
            placeContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 3
        }, children: [_jsx(Typography, { variant: 'h4', gutterBottom: true, sx: {
                    color: '#16f098',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px #16f09844',
                    fontSize: { xs: '2rem', md: '1.8rem', lg: '1.8rem', xl: '2.5rem' }
                }, children: "\uD83D\uDC65 Peer Collaboration" }), _jsxs(Stack, { spacing: 2, sx: {
                    minWidth: '30vw',
                    placeContent: 'center',
                    fontSize: {
                        xs: '0.85rem',
                        md: '1rem',
                        lg: '1rem',
                        xl: '2rem'
                    }
                }, children: [_jsx(MentorFeedbackDialog, { open: feedbackDialogOpen, onClose: () => setFeedbackDialogOpen(false), sessionId: randomSessionId, toUserId: selectedPeerId || '' }), _jsx(TextField, { label: 'Invite Peer by Email', value: email, onChange: e => setEmail(e.target.value), fullWidth: true, sx: {
                            input: {
                                color: '#16f098',
                                backgroundColor: '#1e1e1e',
                                borderRadius: 1
                            },
                            minWidth: { xs: '50vw', md: '40vw', lg: '30vw' },
                            fontSize: {
                                xs: '0.85rem',
                                md: '1rem',
                                lg: '1rem',
                                xl: '2rem'
                            },
                            label: { color: '#aaa' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#16f09844' },
                                '&:hover fieldset': { borderColor: '#16f09888' },
                                '&.Mui-focused fieldset': { borderColor: '#16f098' }
                            }
                        } }), _jsx(Button, { variant: 'contained', onClick: sendInvite, disabled: loading, sx: {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: {
                                xs: '0.85rem',
                                md: '1rem',
                                lg: '1rem',
                                xl: '1rem'
                            },
                            backgroundColor: '#16f098',
                            color: '#000',
                            '&:hover': { backgroundColor: '#14e68d' }
                        }, children: loading ? 'Sending...' : 'Send Invite' })] }), _jsxs(Box, { mt: 4, sx: {
                    minWidth: '80vw',
                    display: 'grid',
                    placeContent: 'center'
                }, children: [_jsx(Typography, { variant: 'h6', sx: {
                            color: '#16f098',
                            mb: 2,
                            textShadow: '0 0 6px #16f09822',
                            textAlign: 'center',
                            fontSize: {
                                xs: '1rem',
                                md: '1rem',
                                lg: '1rem',
                                xl: '1.4rem'
                            }
                        }, children: "\uD83D\uDCDD Pending Requests" }), _jsx(Paper, { variant: 'outlined', sx: {
                            background: 'linear-gradient(145deg, #1a1a1a, #111)',
                            border: '1px solid #16f09833',
                            borderRadius: 3,
                            minWidth: '30vw',
                            boxShadow: '0 0 20px #16f09833',
                            p: 1.5
                        }, children: _jsx(List, { dense: true, sx: {
                                maxHeight: '40vh',
                                overflowY: 'auto',
                                minWidth: { xs: '50vw', md: '40vw', lg: '30vw' },
                                pr: 1,
                                '&::-webkit-scrollbar': { width: '6px' },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#16f09855',
                                    borderRadius: '3px'
                                }
                            }, children: pending.length === 0 ? (_jsx(ListItem, { sx: { justifyContent: 'center', py: 2 }, children: _jsx(ListItemText, { primary: 'No pending requests', primaryTypographyProps: {
                                        color: '#888',
                                        fontStyle: 'italic',
                                        textAlign: 'center'
                                    } }) })) : (pending.map(req => (_jsx(ListItem, { sx: {
                                    borderBottom: '1px dashed #16f09822',
                                    py: 1.5,
                                    px: 1,
                                    '&:hover': { backgroundColor: '#16f09811' }
                                }, secondaryAction: _jsx(Button, { variant: 'contained', size: 'small', onClick: () => acceptInvite(req.id, `${req.fromId}_${req.toId}`), sx: {
                                        textTransform: 'none',
                                        fontSize: {
                                            xs: '0.75rem',
                                            md: '0.85rem',
                                            lg: '.85rem',
                                            xl: '1rem'
                                        },
                                        backgroundColor: '#16f098',
                                        color: '#000',
                                        fontWeight: 600,
                                        borderRadius: 1,
                                        boxShadow: '0 0 8px #16f09855',
                                        '&:hover': { backgroundColor: '#14e68d' }
                                    }, children: "Accept & Join" }), children: _jsx(ListItemText, { primary: req.fromUser?.email || 'Unknown', secondary: `📅 ${new Date(req.createdAt).toLocaleString()}`, primaryTypographyProps: {
                                        color: '#16f098',
                                        fontWeight: 500,
                                        fontSize: {
                                            xs: '0.75rem',
                                            md: '0.85rem',
                                            lg: '.85rem',
                                            xl: '1rem'
                                        },
                                        fontFamily: 'monospace'
                                    }, secondaryTypographyProps: {
                                        color: '#aaa',
                                        fontSize: {
                                            xs: '0.75rem',
                                            md: '0.85rem',
                                            lg: '.85rem',
                                            xl: '1rem'
                                        },
                                        fontFamily: 'monospace'
                                    } }) }, req.id)))) }) })] }), _jsxs(Box, { mt: 4, sx: { display: 'flex', flexDirection: 'column', alignItems: 'center' }, children: [_jsx(Typography, { variant: 'h6', sx: {
                            color: '#16f098',
                            mb: 2,
                            textShadow: '0 0 6px #16f09822',
                            fontSize: {
                                xs: '1rem',
                                md: '.8rem',
                                lg: '1rem',
                                xl: '1.3rem'
                            }
                        }, children: "\u2B50 Leave Feedback for Peers" }), _jsx(Paper, { variant: 'outlined', sx: {
                            background: 'linear-gradient(145deg, #1a1a1a, #111)',
                            border: '1px solid #16f09833',
                            borderRadius: 3,
                            minWidth: '30vw',
                            width: { xs: '50vw', md: '40vw', lg: '30vw' },
                            boxShadow: '0 0 20px #16f09833',
                            p: 1.5,
                        }, children: _jsx(List, { dense: true, children: peers.length === 0 ? (_jsx(ListItem, { sx: { justifyContent: 'center', py: 2 }, children: _jsx(ListItemText, { primary: 'No peers found', primaryTypographyProps: {
                                        color: '#888',
                                        fontSize: {
                                            xs: '1rem',
                                            md: '1rem',
                                            lg: '1rem',
                                            xl: '1rem'
                                        },
                                        fontStyle: 'italic',
                                        textAlign: 'center'
                                    } }) })) : (peers.map(peer => (_jsxs(ListItem, { sx: { borderBottom: '1px dashed #16f09822', py: 1.5, px: 1 }, children: [_jsx(ListItemText, { primary: peer.name || peer.email, primaryTypographyProps: {
                                            color: '#16f098',
                                            fontWeight: 500,
                                            fontSize: {
                                                xs: '.8rem',
                                                md: '1rem',
                                                lg: '1rem',
                                                xl: '1.2rem'
                                            },
                                            fontFamily: 'monospace'
                                        } }), _jsx(Button, { variant: 'outlined', size: 'small', onClick: () => {
                                            setSelectedPeerId(peer.id);
                                            setFeedbackDialogOpen(true);
                                        }, sx: {
                                            textTransform: 'none',
                                            color: '#16f098',
                                            borderColor: '#16f09855',
                                            fontSize: {
                                                xs: '.8rem',
                                                md: '1rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            },
                                            '&:hover': { borderColor: '#14e68d' }
                                        }, children: "Leave Feedback" })] }, peer.id)))) }) })] }), _jsx(Snackbar, { open: snackbarOpen, autoHideDuration: 4000, onClose: () => setSnackbarOpen(false), anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { severity: snackbarSeverity, variant: 'filled', onClose: () => setSnackbarOpen(false), sx: {
                        backgroundColor: snackbarSeverity === 'success' ? '#16f098' : '#ff4d4f',
                        color: '#000',
                        fontWeight: 'bold',
                        boxShadow: '0 0 10px',
                        fontFamily: 'monospace'
                    }, children: snackbarMsg }) })] }));
};
export default PeerDashboard;
