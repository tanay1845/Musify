import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import PlayBar from './components/PlayBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Navbar />
      <App />
      {/* <PlayBar /> */}
    </Router>
  </StrictMode>,
)
