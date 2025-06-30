import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Rating, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
const MentorFeedbackDialog = ({ open, onClose, toUserId, sessionId }) => {
    const [rating, setRating] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL;
    const handleSubmit = async () => {
        if (rating === null) {
            alert('Please select a rating');
            return;
        }
        console.log({
            toUserId,
            sessionId,
            rating,
            feedback,
            token: localStorage.getItem('token')
        });
        const res = await fetch(`${baseUrl}/api/mentor/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                toUserId,
                sessionId,
                rating,
                feedback
            })
        });
        const json = await res.json();
        if (res.ok) {
            setSnackbarOpen(true);
            onClose();
            setRating(null);
            setFeedback('');
        }
        else {
            alert(json.message || 'Something went wrong');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Dialog, { open: open, onClose: onClose, maxWidth: 'sm', fullWidth: true, PaperProps: {
                    sx: {
                        background: 'linear-gradient(145deg, #1a1a1a, #111)',
                        color: '#e0e0e0',
                        border: '1px solid #16f09833',
                        boxShadow: '0 0 20px #16f09833',
                        borderRadius: 3,
                        fontFamily: 'monospace'
                    }
                }, children: [_jsx(DialogTitle, { sx: {
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.4rem',
                            color: '#16f098',
                            textShadow: '0 0 6px #16f09855'
                        }, children: "\u2B50 Leave Mentor Feedback" }), _jsxs(DialogContent, { sx: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2
                        }, children: [_jsx(Rating, { name: 'mentor-rating', value: rating, onChange: (_, newValue) => setRating(newValue), size: 'large', sx: {
                                    color: '#16f098',
                                    '& .MuiRating-iconFilled': {
                                        color: '#16f098'
                                    },
                                    '& .MuiRating-iconHover': {
                                        color: '#14e68d'
                                    }
                                } }), _jsx(TextField, { multiline: true, fullWidth: true, minRows: 4, label: 'Write your feedback...', value: feedback, onChange: e => setFeedback(e.target.value), sx: {
                                    mt: 1,
                                    input: { color: '#16f098' },
                                    label: { color: '#aaa' },
                                    backgroundColor: '#1e1e1e',
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#16f09844' },
                                        '&:hover fieldset': { borderColor: '#16f09888' },
                                        '&.Mui-focused fieldset': { borderColor: '#16f098' }
                                    }
                                } })] }), _jsxs(DialogActions, { sx: { justifyContent: 'center', pb: 2 }, children: [_jsx(Button, { onClick: onClose, sx: {
                                    color: '#aaa',
                                    borderColor: '#16f09855',
                                    '&:hover': {
                                        borderColor: '#16f098aa',
                                        color: '#16f098'
                                    }
                                }, variant: 'outlined', children: "Cancel" }), _jsx(Button, { onClick: handleSubmit, disabled: !rating, variant: 'contained', sx: {
                                    ml: 1,
                                    background: 'linear-gradient(90deg, #16f098, #4ade80)',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    boxShadow: '0 0 10px #16f09855',
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #14e68d, #22c55e)',
                                        boxShadow: '0 0 14px #14e68d77'
                                    }
                                }, children: "Submit" })] })] }), _jsx(Snackbar, { open: snackbarOpen, autoHideDuration: 3000, onClose: () => setSnackbarOpen(false), anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { severity: 'success', onClose: () => setSnackbarOpen(false), sx: {
                        backgroundColor: '#16f098',
                        color: '#000',
                        fontWeight: 'bold'
                    }, children: "\u2705 Feedback submitted successfully!" }) })] }));
};
export default MentorFeedbackDialog;
