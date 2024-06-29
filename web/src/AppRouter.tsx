import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MatchContainer from './pages/MatchContainer';
import App from './pages/App';
import './pages/Principal.css';
import Principal from './pages/Principal';

function AppRouter() {
  return ( 
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user/:id" element={<Principal />} />
          <Route path="/user/:id/profile" element={<Profile  />} />
          <Route path="/user/:id/matches" element={<MatchContainer  />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
      </App>
    </Router>
  )
}

export default AppRouter