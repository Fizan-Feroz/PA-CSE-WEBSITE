import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DepartmentDataProvider } from './context/DepartmentDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DepartmentDataProvider>
      <App />
    </DepartmentDataProvider>
  </StrictMode>,
)
