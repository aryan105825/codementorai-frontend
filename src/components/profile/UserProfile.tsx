import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Rating,
  Divider,
} from '@mui/material';

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token') || '';
  const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL

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
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        color: '#e0e0e0',
        fontFamily: 'monospace',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: '#16f098',
          fontWeight: 'bold',
          mb: 3,
          textShadow: '0 0 12px #16f09855',
        }}
      >
        🧑‍💻 Your Developer Profile
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: '#111',
          border: '1px solid #16f09844',
          borderRadius: 3,
          boxShadow: '0 0 12px #16f09833',
        }}
      >
        <Typography variant="subtitle1" sx={{ color: '#16f098', mb: 1 }}>
          🆔 User ID
        </Typography>
        <Typography sx={{ mb: 1, wordBreak: 'break-all' }}>{user.id}</Typography>

        <Divider sx={{ my: 2, borderColor: '#16f09822' }} />

        <Typography variant="subtitle1" sx={{ color: '#16f098', mb: 1 }}>
          📛 Name
        </Typography>
        <Typography sx={{ mb: 1 }}>{user.name || 'Anonymous'}</Typography>

        <Typography variant="subtitle1" sx={{ color: '#16f098', mb: 1 }}>
          📧 Email
        </Typography>
        <Typography sx={{ mb: 1 }}>{user.email}</Typography>

        <Typography variant="subtitle1" sx={{ color: '#16f098', mb: 1 }}>
          🏷️ Role
        </Typography>
        <Typography sx={{ mb: 1 }}>{user.role}</Typography>

        <Typography variant="subtitle1" sx={{ color: '#16f098', mb: 1 }}>
          📅 Joined
        </Typography>
        <Typography>{new Date(user.createdAt).toLocaleDateString()}</Typography>
      </Paper>

      <Typography
        variant="h6"
        sx={{
          color: '#16f098',
          mb: 2,
          textShadow: '0 0 8px #16f09844',
        }}
      >
        ⭐ Feedback Received
      </Typography>

      {feedbacks.length === 0 ? (
        <Typography color="#888" fontStyle="italic">
          No feedback yet
        </Typography>
      ) : (
        <Paper
          sx={{
            backgroundColor: '#111',
            border: '1px solid #16f09822',
            borderRadius: 3,
            boxShadow: '0 0 10px #16f09822',
            p: 2,
          }}
        >
          <List>
            {feedbacks.map((fb) => (
              <ListItem
                key={fb.id}
                sx={{
                  borderBottom: '1px dashed #16f09822',
                  mb: 1,
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                <ListItemText
                  primary={fb.feedback || 'No comment'}
                  secondary={`From: ${fb.fromUser?.name || 'Anonymous'} • ${new Date(fb.createdAt).toLocaleString()}`}
                  primaryTypographyProps={{
                    color: '#16f098',
                    fontSize: '0.9rem',
                  }}
                  secondaryTypographyProps={{
                    color: '#aaa',
                    fontSize: '0.75rem',
                  }}
                />
                <Rating value={fb.rating} readOnly size="small" />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default UserProfile;
