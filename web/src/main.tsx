import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import { LoginUserProvider } from './context/LoginContext.tsx'
import { MatchProvider } from './context/MatchContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoginUserProvider>
      <MatchProvider>
      <App />
      </MatchProvider>
    </LoginUserProvider>
  </React.StrictMode>,
)
