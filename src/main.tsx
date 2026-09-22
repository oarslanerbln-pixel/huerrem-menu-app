import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConceptProvider } from './context/ConceptContext.tsx';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConceptProvider>
      <App />
    </ConceptProvider>
  </StrictMode>,
)
