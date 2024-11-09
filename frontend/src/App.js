// src/app.js

import React, { useState } from 'react';
import SignupForm from './components/signup/signupForm';
import LoginForm from './components/login/loginForm';
import LocationDisplay from './components/locationDisplay';
import Notification from './components/notification';
import './styles/app.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('user') !== null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setNotification({ message: 'Successfully logged in!', type: 'success' });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowLogin(false);
    setShowSignup(false);
    setNotification({ message: 'Logged out successfully.', type: 'success' });
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          <LocationDisplay />
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div className="auth-container">
          {!showLogin && !showSignup ? (
            <div className="landing">
              <h1>Welcome to Our App</h1>
              <button className="auth-button" onClick={() => setShowLogin(true)}>Log In</button>
              <button className="auth-button" onClick={() => setShowSignup(true)}>Sign Up</button>
            </div>
          ) : showLogin ? (
            <LoginForm onLogin={handleLogin} setNotification={setNotification} />
          ) : (
            <SignupForm onLogin={handleLogin} setNotification={setNotification} />
          )}
        </div>
      )}

      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default App;
