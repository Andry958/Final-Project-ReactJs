import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AllNewsProvider } from './Componens/context/AllContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AllNewsProvider>
      <App />
    </AllNewsProvider>
  </StrictMode>,
)
