import { useState, useRef } from 'react'
import html2pdf from 'html2pdf.js'
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  CircularProgress,
  MenuItem
} from '@mui/material'
import { motion } from 'framer-motion';
const languages = ['JavaScript', 'Python', 'C++', 'Java', 'Go', 'Rust']
const goals = [
  'Web Development',
  'Data Structures & Algorithms',
  'AI/ML',
  'Competitive Programming',
  'Game Development',
  'Mobile App Development'
]

const RoadmapGenerator = () => {
  const [language, setLanguage] = useState(languages[0])
  const [goal, setGoal] = useState(goals[0])
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const roadmapRef = useRef<HTMLDivElement>(null)
  const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${baseUrl}/api/ai/assist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`
          },
          body: JSON.stringify({
            prompt: `Create a step-by-step learning roadmap for mastering ${language} for ${goal}. Include concepts, tools, and resources.`,
            code: '',
            language
          })
        }
      )
      const data = await res.json()
      setResponse(data.response || 'No roadmap returned.')
    } catch (err) {
      console.error(err)
      setResponse('Failed to get roadmap.')
    }
    setLoading(false)
  }

  const handleDownload = () => {
    if (!roadmapRef.current) return
    html2pdf()
      .set({
        margin: 0.5,
        filename: `${language}-${goal}-roadmap.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .from(roadmapRef.current)
      .save()
  }

  return (
     <Box
    sx={{
      p: 4,
      minHeight: '100vh',
      color: '#e0e0e0',
      fontFamily: 'monospace',
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
          textShadow: '0 0 8px #16f09844',
          mb: 4,
        }}
      >
        🧭 AI-Powered Learning Roadmap
      </Typography>
    </motion.div>

    <Stack
      spacing={3}
      direction='row'
      sx={{ mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <TextField
        select
        label='Language'
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        sx={{
          minWidth: 200,
          backgroundColor: '#1a1a1a',
          color: '#fff',
          '& .MuiInputBase-input': { color: '#16f098' },
          '& .MuiInputLabel-root': { color: '#aaa' },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': { borderColor: '#16f09844' },
            '&:hover fieldset': { borderColor: '#16f09888' },
            '&.Mui-focused fieldset': { borderColor: '#16f098' },
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label='Goal'
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        sx={{
          minWidth: 250,
          backgroundColor: '#1a1a1a',
          color: '#fff',
          '& .MuiInputBase-input': { color: '#16f098' },
          '& .MuiInputLabel-root': { color: '#aaa' },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '& fieldset': { borderColor: '#16f09844' },
            '&:hover fieldset': { borderColor: '#16f09888' },
            '&.Mui-focused fieldset': { borderColor: '#16f098' },
          },
        }}
      >
        {goals.map((g) => (
          <MenuItem key={g} value={g}>
            {g}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant='contained'
        onClick={handleGenerate}
        disabled={loading}
        sx={{
          background: 'linear-gradient(90deg, #16f098, #4ade80)',
          color: '#000',
          fontWeight: 'bold',
          px: 3,
          borderRadius: 2,
          boxShadow: '0 0 10px #16f09855',
          '&:hover': {
            background: 'linear-gradient(90deg, #14e68d, #22c55e)',
            boxShadow: '0 0 14px #14e68d77',
          },
        }}
      >
        {loading ? <CircularProgress size={20} color='inherit' /> : '🚀 Generate'}
      </Button>
    </Stack>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        ref={roadmapRef}
        sx={{
          backgroundColor: 'rgba(18,18,18,0.9)',
          border: '1px solid #16f09833',
          borderRadius: 3,
          boxShadow: '0 0 12px #16f09822',
          p: 3,
          whiteSpace: 'pre-wrap',
          backdropFilter: 'blur(3px)',
          mb: 3,
          minHeight: '200px',
        }}
      >
        {response || '💡 No roadmap generated yet.'}
      </Box>
    </motion.div>

    <Stack spacing={2} direction='row' justifyContent='center' flexWrap='wrap'>
      <Button
        variant='outlined'
        onClick={() => {
          const blob = new Blob([response], { type: 'text/markdown' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${language}-${goal}-roadmap.md`;
          link.click();
          URL.revokeObjectURL(url);
        }}
        sx={{
          borderColor: '#16f09855',
          color: '#16f098',
          '&:hover': {
            borderColor: '#16f098',
            backgroundColor: '#16f09811',
          },
        }}
      >
        📝 Download Markdown
      </Button>

      <Button
        variant='outlined'
        onClick={handleDownload}
        sx={{
          borderColor: '#16f09855',
          color: '#16f098',
          '&:hover': {
            borderColor: '#16f098',
            backgroundColor: '#16f09811',
          },
        }}
      >
        📄 Download PDF
      </Button>
    </Stack>
  </Box>
  )
}

export default RoadmapGenerator
