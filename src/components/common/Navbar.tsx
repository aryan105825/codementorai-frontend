import { Box, Typography, Button, Stack, IconButton, Avatar, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'Editor', path: '/ai-editor' },
    { label: 'Roadmap', path: '/roadmap' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Peers', path: '/peers' }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        
        justifyContent: 'space-between',
        px: 3,
        py: 1.5,
        background: '#121212',
        borderBottom: '1px solid #16f09833',
        position: 'fixed',
        left: 0,
        minWidth:'100vw',
        top: 0,
        zIndex: 1000
      }}
    >
    
      <motion.div whileHover={{ scale: 1.05 }}>
        <Typography
          onClick={() => navigate('/')}
          sx={{
            color: '#16f098',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            fontSize: '1.3rem',
            cursor: 'pointer'
          }}
        >
          🚀 CodeMentor AI
        </Typography>
      </motion.div>

    
      <Stack direction="row" spacing={2}>
        {links.map(link => (
          <Button
            key={link.path}
            onClick={() => navigate(link.path)}
            sx={{
              color: '#e0e0e0',
              textTransform: 'none',
              fontFamily: 'monospace',
              fontWeight: 500,
              '&:hover': {
                color: '#16f098'
              }
            }}
          >
            {link.label}
          </Button>
        ))}
      </Stack>

    
      <Tooltip title="Profile">
        <IconButton onClick={() => navigate('/profile')}>
          <Avatar
            sx={{
              bgcolor: '#16f098',
              width: 32,
              height: 32,
              color: '#000',
              fontWeight: 700,
              fontSize: '0.9rem'
            }}
          >
            U
          </Avatar>
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Navbar;
