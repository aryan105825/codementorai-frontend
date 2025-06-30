import { IconButton, Avatar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileIcon = () => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Your Profile">
      <IconButton
        onClick={() => navigate('/profile')}
        sx={{
          ml: 2,
          color: '#16f098',
          border: '2px solid #16f09855',
          '&:hover': { borderColor: '#16f098' },
        }}
      >
        <Avatar sx={{ bgcolor: '#16f098', width: 32, height: 32, color: '#000', fontWeight: 700 }}>
          U
        </Avatar>
      </IconButton>
    </Tooltip>
  );
};

export default ProfileIcon;
