import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Container,
  Divider
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  Code,
  Users,
  Rocket,
  FileText,
  ShieldCheck,
  ScrollText,
  BarChart3,
  MessageCircle,
  ClipboardCheck,
  FileOutput,
  Layers
} from 'lucide-react'
import { Engine } from 'tsparticles-engine'
import BG from './SS/BG.png'
import AI_EDITOR from './SS/ai_editors.png'
import DASHBOARD from './SS/dashboards.png'
import Roadmap_GENERATOR from './SS/roadmaps.png'
import Peer from './SS/peer.png'

import MorphingWave from './MorphingWave'
import AnimatedWave from './AnimatedWave'
export default function LandingPage () {
  const navigate = useNavigate()

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const features = [
    {
      icon: <Code size={28} />,
      title: 'AI Assist',
      desc: 'Explain, fix & refactor code with OpenRouter AI.'
    },
    {
      icon: <Users size={28} />,
      title: 'Real-time Collaboration',
      desc: 'Pair coding with live sync & driver mode.'
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Auth + DB',
      desc: 'Secure JWT auth & scalable Supabase DB.'
    },
    {
      icon: <ScrollText size={28} />,
      title: 'Session Logs',
      desc: 'Auto-log AI prompts & executions.'
    },
    {
      icon: <MessageCircle size={28} />,
      title: 'Feedback System',
      desc: 'Peer feedback & mentor ratings.'
    },
    {
      icon: <Brain size={28} />,
      title: 'Roadmap Generator',
      desc: 'AI-crafted learning paths in PDF & markdown.'
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Analytics Dashboard',
      desc: 'See language usage & AI stats.'
    },
    {
      icon: <ClipboardCheck size={28} />,
      title: 'Prompt / Code Counters',
      desc: 'Track usage transparently.'
    },
    {
      icon: <Layers size={28} />,
      title: 'Multi-user Sync',
      desc: 'Stay in sync across devices.'
    }
  ]

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a, #000)',
        color: 'white',
        minWidth: '100vw',
        overflow: 'hidden',
        fontFamily: 'monospace'
      }}
    >
      <Particles
        id='tsparticles'
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: 'transparent' } },
          particles: {
            number: { value: 60 },
            size: { value: 2.5 },
            color: { value: '#16f098' },
            move: { enable: true, speed: 0.6 },
            links: { enable: true, color: '#16f098', opacity: 0.2 }
          }
        }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      <Container
        maxWidth='lg'
        sx={{
          position: 'relative',
          zIndex: 1,
          pt: 12,
          pb: 8
        }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant='h2'
            align='center'
            sx={{
              fontWeight: 'bold',
              mb: 3,
              background: 'linear-gradient(90deg, #16f098, #4ade80, #16f098)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 1,
              textShadow: '0 0 20px #16f09855',
              fontSize: { xs: '2.2rem', md: '3rem' }
            }}
          >
            🚀 CodeMentor AI
          </Typography>
          <Typography
            variant='h6'
            align='center'
            sx={{
              color: '#b0b0b0',
              maxWidth: 750,
              mx: 'auto',
              mb: 5,
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              textShadow: '0 0 10px rgba(0,0,0,0.5)'
            }}
          >
            AI-powered coding, real-time collaboration & learning built for
            modern developers.
          </Typography>
          <Box textAlign='center'>
            <motion.div whileHover={{ scale: 1.12 }}>
              <Button
                onClick={() => navigate('/register')}
                variant='contained'
                size='large'
                sx={{
                  background: 'linear-gradient(90deg, #16f098, #4ade80)',
                  color: '#000',
                  fontWeight: 'bold',
                  px: 5,
                  py: 1.8,
                  borderRadius: 3,
                  fontSize: '1rem',
                  boxShadow: '0 0 20px #16f09888',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #14e68d, #22c55e)',
                    boxShadow: '0 0 25px #16f098aa'
                  }
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Box>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              textAlign: 'center',
              marginTop: 18,
              color: '#16f09899',
              fontSize: '0.9rem'
            }}
          >
            ↓ Scroll to explore features
          </motion.div>

          <Typography
            variant='subtitle1'
            align='center'
            sx={{
              mt: 3,
              color: '#aaa',
              fontStyle: 'italic',
              textShadow: '0 0 8px rgba(0,0,0,0.4)'
            }}
          >
            Built for devs, loved by devs.
          </Typography>
        </motion.div>

        <Box sx={{ mt: 6, mb: -2, overflow: 'hidden', lineHeight: 0 }}>
          <AnimatedWave />
        </Box>

        <Divider sx={{ my: 7, borderColor: '#16f09844' }} />
        <Typography
          variant='h4'
          textAlign='center'
          sx={{
            mt: 9,
            mb: 5,
            color: '#16f098',
            fontWeight: 'bold',
            textShadow: '0 0 10px #16f09833'
          }}
        >
          📸 See CodeMentor AI in Action
        </Typography>

        <Grid container spacing={4} justifyContent='center'>
          {[
            { src: AI_EDITOR, title: 'AI Editor' },
            { src: Peer, title: 'Peer Dashboard' },
            { src: Roadmap_GENERATOR, title: 'Roadmap Generator' },
            { src: DASHBOARD, title: 'Analytics' }
          ].map((shot, i) => (
            <Grid
              sx={{
                cursor: 'pointer', 
                '&:hover': {
                  boxShadow: '0 0 20px #16f09855',
                  transform: 'scale(1.05)'
                }
              }}
              item
              xs={12}
              sm={6}
              md={4}
              key={i}
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Paper
                  sx={{
                    p: 1,
                    borderRadius: 4,
                    overflow: 'hidden',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #16f09822',
                    boxShadow: '0 0 18px #16f09822',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box
                    component='img'
                    src={shot.src}
                    alt={shot.title}
                    sx={{
                      width: '30vw',
                      height: 'auto',
                      borderRadius: 2,
                      mb: 1,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.02)'
                      }
                    }}
                  />
                  <Typography
                    textAlign='center'
                    sx={{ color: '#e0e0e0', fontWeight: 500 }}
                  >
                    {shot.title}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        {/* Features */}
        <Typography
          variant='h4'
          textAlign='center'
          sx={{
            mb: 5,
            mt: 9,
            color: '#16f098',
            fontWeight: 'bold',
            textShadow: '0 0 10px #16f09833'
          }}
        >
          🔍 Explore All Features
        </Typography>

        <Grid container spacing={4} justifyContent='center'>
          {features.map((feature, i) => (
            <Grid
              sx={{
                cursor: 'pointer', 
                '&:hover': {
                  boxShadow: '0 0 20px #16f09855',
                  transform: 'scale(1.05)'
                }
              }}
              item
              xs={12}
              sm={6}
              md={4}
              key={i}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    background:
                      'linear-gradient(180deg, rgba(26,26,26,0.95), rgba(20,20,20,0.9))',
                    border: '1px solid #16f09833',
                    borderRadius: 4,
                    backdropFilter: 'blur(4px)',
                    textAlign: 'center',
                    boxShadow: '0 0 25px rgba(22, 240, 152, 0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box mb={1} color='#16f098'>
                    {feature.icon}
                  </Box>
                  <Typography variant='h6' sx={{ color: '#f0f0f0', mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: '#aaa', fontSize: '0.92rem' }}>
                    {feature.desc}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        component='footer'
        sx={{
          textAlign: 'center',
          py: 4,
          mt: 8,
          borderTop: '1px solid #16f09822',
          background:
            'linear-gradient(90deg, rgba(22,240,152,0.03), rgba(74,222,128,0.03))',
          position: 'relative',
          zIndex: 1,
          fontSize: '0.85rem',
          color: '#aaa',
          letterSpacing: 0.5,
          backdropFilter: 'blur(3px)',
          boxShadow: '0 0 20px rgba(22,240,152,0.08)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 0 25px rgba(22,240,152,0.2)',
            color: '#ccc'
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          © {new Date().getFullYear()}{' '}
          <span style={{ color: '#16f098' }}>CodeMentor AI</span> &nbsp;–
          Crafted for devs.
        </motion.div>
      </Box>
    </Box>
  )
}
