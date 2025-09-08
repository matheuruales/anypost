import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Navbar from './components/common/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Posts from './components/posts/Posts';
import SocialAccounts from './components/social-accounts/SocialAccounts';
import './App.css';

function App() {
  const { currentUser } = useAuth();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!currentUser && !user.uid) {
    return <Login />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/social-accounts" element={<SocialAccounts />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;