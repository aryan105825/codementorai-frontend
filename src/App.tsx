import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import AIEditor from './components/AIEditor'
import PeerDashboard from './components/dashboard/PeerDashboard'
import { useEffect } from 'react'
import socket from './hooks/useSocket'
import LandingPage from './components/LandingPage'
import RoadmapGenerator from './components/RoadmapGenerator'
import { Box } from '@mui/material'
import UserProfile from './components/profile/UserProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/common/Navbar'
import LayoutWithNavbar from './components/common/LayoutWithNavbar'

function App () {
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      socket.emit('join-user-id', userId)
      console.log('🧠 Rejoined socket room on load:', userId)
    }
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<LayoutWithNavbar />}>
          <Route
            path='/ai-editor'
            element={
              <ProtectedRoute>
                <AIEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path='/roadmap'
            element={
              <ProtectedRoute>
                <RoadmapGenerator />
              </ProtectedRoute>
            }
          />

          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/peers'
            element={
              <ProtectedRoute>
                <PeerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/editor/:roomId'
            element={
              <ProtectedRoute>
                <AIEditor />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
