import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
// import './index.css'
import { LoginUserProvider } from './context/LoginContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginUserProvider>
      <App />
    </LoginUserProvider>
  </React.StrictMode>,
)
