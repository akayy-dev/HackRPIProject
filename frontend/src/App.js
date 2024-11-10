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
  // Initialize login state based on session storage
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('user') !== null);
  const [formType, setFormType] = useState('login'); // Toggle between login and signup
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Mock credentials for demonstration (for login form validation)
  const correctUsername = 'user';
  const correctPassword = 'password';

  // Handle form submission for login/signup
  const handleAuthSubmit = ({ username, password }) => {
    if (formType === 'login') {
      // Mock login validation
      if (username === correctUsername && password === correctPassword) {
        sessionStorage.setItem('user', username);
        setIsLoggedIn(true);
        setNotification({ message: 'Successfully logged in!', type: 'success' });
      } else {
        setNotification({ message: 'Incorrect username or password', type: 'error' });
      }
    } else if (formType === 'signup') {
      // Mock signup action (you could add actual signup logic here)
      sessionStorage.setItem('user', username);
      setIsLoggedIn(true);
      setNotification({ message: 'Signup successful!', type: 'success' });
    }
  };

  // Logout function to clear session and update state
  const handleLogout = () => {
    sessionStorage.removeItem('user'); // Clear user data from storage
    setIsLoggedIn(false); // Update login state
    setNotification({ message: 'Logged out successfully.', type: 'success' });
  };

  // Toggle between login and signup forms
  const toggleFormType = () => {
    setFormType((prevType) => (prevType === 'login' ? 'signup' : 'login'));
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
          <AuthForm onSubmit={handleAuthSubmit} formType={formType} setNotification={setNotification} />
          <button onClick={toggleFormType}>
            {formType === 'login' ? 'Switch to Sign Up' : 'Switch to Log In'}
          </button>
          {notification.message && <p className={`notification ${notification.type}`}>{notification.message}</p>}
        </div>
      )}
    </Router>
  );
};

export default App;
