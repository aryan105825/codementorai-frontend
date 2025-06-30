import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, Avatar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const ProfileIcon = () => {
    const navigate = useNavigate();
    return (_jsx(Tooltip, { title: "Your Profile", children: _jsx(IconButton, { onClick: () => navigate('/profile'), sx: {
                ml: 2,
                color: '#16f098',
                border: '2px solid #16f09855',
                '&:hover': { borderColor: '#16f098' },
            }, children: _jsx(Avatar, { sx: { bgcolor: '#16f098', width: 32, height: 32, color: '#000', fontWeight: 700 }, children: "U" }) }) }));
};
export default ProfileIcon;
