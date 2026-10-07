import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomepageNew from './HomepageNew.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomepageNew />
  </StrictMode>,
)
