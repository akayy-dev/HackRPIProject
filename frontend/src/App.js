// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmissionsReportPage from './pages/EmissionsReportPage';
import ShopPage from './pages/ShopPage';
import Navbar from './components/Navbar';
import AuthForm from './components/auth/AuthForm';
import './styles/App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('user') !== null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const correctUsername = 'user';
  const correctPassword = 'password';

  const handleAuthSubmit = ({ username, password }, formType) => {
    if (formType === 'login') {
      if (username === correctUsername && password === correctPassword) {
        sessionStorage.setItem('user', username);
        setIsLoggedIn(true);
        setNotification({ message: 'Successfully logged in!', type: 'success' });
      } else {
        setNotification({ message: 'Incorrect username or password', type: 'error' });
      }
    } else if (formType === 'signup') {
      sessionStorage.setItem('user', username);
      setIsLoggedIn(true);
      setNotification({ message: 'Signup successful!', type: 'success' });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setNotification({ message: 'Logged out successfully.', type: 'success' });
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar logout={handleLogout} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/emissions-report" element={<EmissionsReportPage />} />
            <Route path="/shop" element={<ShopPage />} />
          </Routes>
        </>
      ) : (
        <div className="auth-container">
          <AuthForm onSubmit={handleAuthSubmit} setNotification={setNotification} />
          {notification.message && <p className={`notification ${notification.type}`}>{notification.message}</p>}
        </div>
      )}
    </Router>
  );
};

export default App;
