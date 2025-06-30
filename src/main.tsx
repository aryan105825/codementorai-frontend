import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider theme={darkTheme}>
      <CssBaseline />
       <AuthProvider> 
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
