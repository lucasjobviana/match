// import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './pages/App.tsx'
import AppRouter from './AppRouter.tsx'
import { LoginUserProvider } from './context/LoginContext.tsx'
import { MatchProvider } from './context/MatchContext.tsx'
import { NotificationProvider } from './context/NotificationContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
   
    <LoginUserProvider>
      <MatchProvider>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </MatchProvider>
    </LoginUserProvider>
   ,
)
