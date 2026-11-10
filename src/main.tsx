import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { App } from './app/App'
import { ThemeProvider } from './lib/theme'
import './styles/global.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root container #root was not found')

createRoot(container).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
