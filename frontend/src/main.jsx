import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { Toaster } from 'react-hot-toast'
import { MusicProvider } from './context/MusicContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MusicProvider>

    <Router>
      <Navbar />
      <App />
    </Router>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      />
      </MusicProvider>
  </StrictMode>,
)
