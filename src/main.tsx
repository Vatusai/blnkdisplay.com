import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './lib/theme.tsx'
import { Toaster } from '@/components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#09090b',
              border: '1px solid #27272a',
              color: '#fff',
            },
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
