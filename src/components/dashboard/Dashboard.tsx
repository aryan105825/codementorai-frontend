import { useEffect, useState } from 'react'
import { Box, Typography, Paper, CircularProgress } from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

const Dashboard = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await fetch(
        `${baseUrl}/api/analytics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      const json = await res.json()
      setData(json)
      setLoading(false)
    }
    fetchAnalytics()
  }, [])

  if (loading) return <CircularProgress sx={{ mt: 4 }} />

  const chartData = Object.entries(data.languageCount).map(([lang, count]) => ({
    language: lang,
    count
  }))

  return (
    <Box
      sx={{
        p: 4,
        fontFamily: 'monospace',
        color: '#e0e0e0',
        minHeight: '100vh',
        minWidth: '100vw',
        background: 'linear-gradient(135deg, #0f172a, #000)',
        display: 'grid',
        gap: 4
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant='h4'
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #16f098, #4ade80)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 8px #16f09844'
          }}
        >
          📊 Your Learning Dashboard
        </Typography>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: 'rgba(18,18,18,0.9)',
            border: '1px solid #16f09833',
            boxShadow: '0 0 12px #16f09822',
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            gap: 3,
            backdropFilter: 'blur(3px)'
          }}
        >
          <Typography sx={{ color: '#aaa', fontSize: '1rem' }}>
            🧠 Total Sessions:{' '}
            <strong style={{ color: '#16f098' }}>
              <CountUp end={data.totalSessions} duration={1.5} />
            </strong>
          </Typography>
          <Typography sx={{ color: '#aaa', fontSize: '1rem' }}>
            🤖 AI Prompts:{' '}
            <strong style={{ color: '#16f098' }}>
              <CountUp end={data.aiPromptCount} duration={1.5} />
            </strong>
          </Typography>
          <Typography sx={{ color: '#aaa', fontSize: '1rem' }}>
            ⚙️ Code Executions:{' '}
            <strong style={{ color: '#16f098' }}>
              <CountUp end={data.executionCount} duration={1.5} />
            </strong>
          </Typography>
        </Paper>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: 'rgba(18,18,18,0.9)',
            border: '1px solid #16f09833',
            boxShadow: '0 0 12px #16f09822',
            borderRadius: 3,
            backdropFilter: 'blur(3px)'
          }}
        >
          <Typography
            variant='h6'
            sx={{
              mb: 2,
              color: '#16f098',
              fontWeight: 'bold',
              textShadow: '0 0 6px #16f09833'
            }}
          >
            💻 Languages Used
          </Typography>

          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey='language' stroke='#aaa' />
              <YAxis stroke='#aaa' allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e1e',
                  border: '1px solid #16f09855',
                  color: '#16f098',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem'
                }}
              />
              <Bar dataKey='count' fill='#16f098' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </motion.div>
    </Box>
  )
}

export default Dashboard
