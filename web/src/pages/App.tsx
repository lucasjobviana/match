import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Principal from './Principal'
import Login from './Login';
import Profile from './Profile';

function App() {
  console.log('app ')
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user/:id" element={<Principal  />} />
      <Route path="/user/:id/profile" element={<Profile  />} />
      <Route path="*" element={<Navigate to="/" />} /> 
    </Routes>
  </Router>
  )
}

export default App
