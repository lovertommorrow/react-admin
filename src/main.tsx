import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './styles/index.css'
import LocaleProvider from './providers/LocaleProvider.tsx'

async function setupApp() {
  const rootElement = document.getElementById('root')
  if (!rootElement) return

  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </StrictMode>,
  )
}

setupApp();
