import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { AuthProvider } from './lib/AuthProvider.tsx'
import { applyTheme, getStoredTheme } from './utils/theme'
import App from './App.tsx'

// index.html hardcodes data-theme="dark" as a safe static default so the page
// never paints with zero color tokens resolved. This only needs to *flip* it
// if the stored preference is 'light'.
applyTheme(getStoredTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
