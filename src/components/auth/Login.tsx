import { useState } from 'react'
import {
  Button,
  TextField,
  Container,
  Typography,
  Snackbar,
  Alert
} from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import socket from '../../hooks/useSocket'
import { motion } from 'framer-motion'
const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    if (res.ok) {
      login(data.token, data.user)
      socket.emit('join-user-id', data.user.id) 
      console.log('🔗 Emitted join-user-id for', data.user.id) 
      navigate('/dashboard')
    } else {
      setErrorMsg(data.message || 'Login failed')
      setSnackbarOpen(true)
    }
  }

  return (
    <Container
      maxWidth='xs'
      sx={{
        mt: 8,
        p: 4,
        borderRadius: 3,
        fontFamily: 'monospace',
        background: 'linear-gradient(145deg, #1a1a1a, #111)',
        boxShadow: '0 0 20px #16f09822',
        border: '1px solid #16f09833',
        color: '#e0e0e0'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography
          variant='h5'
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#16f098',
            textShadow: '0 0 10px #16f09855',
            mb: 3
          }}
        >
          🔐 Login to CodeMentor AI
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label='Email'
            fullWidth
            margin='normal'
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete='email'
            sx={{
              input: { color: '#16f098', backgroundColor: '#1e1e1e' },
              label: { color: '#aaa' },
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                '& fieldset': { borderColor: '#16f09844' },
                '&:hover fieldset': { borderColor: '#16f09888' },
                '&.Mui-focused fieldset': { borderColor: '#16f098' }
              }
            }}
          />

          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete='current-password'
            sx={{
              input: { color: '#16f098', backgroundColor: '#1e1e1e' },
              label: { color: '#aaa' },
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                '& fieldset': { borderColor: '#16f09844' },
                '&:hover fieldset': { borderColor: '#16f09888' },
                '&.Mui-focused fieldset': { borderColor: '#16f098' }
              }
            }}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{
              mt: 3,
              backgroundColor: '#16f098',
              color: '#000',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 0 10px #16f09855',
              '&:hover': {
                backgroundColor: '#14e68d',
                boxShadow: '0 0 14px #14e68d77'
              }
            }}
          >
            🚀 Login
          </Button>
        </form>

        <Typography
          sx={{
            mt: 2,
            textAlign: 'center',
            fontSize: '0.85rem',
            color: '#aaa'
          }}
        >
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{
              color: '#16f098',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Register
          </span>
        </Typography>
      </motion.div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity='error'
          variant='filled'
          onClose={() => setSnackbarOpen(false)}
          sx={{
            backgroundColor: '#ff4d4f',
            color: '#fff',
            fontWeight: 'bold',
            boxShadow: '0 0 10px #ff4d4f77',
            fontFamily: 'monospace'
          }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Login
