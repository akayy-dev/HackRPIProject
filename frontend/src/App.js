// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LocationDisplay from './components/locationDisplay';
import Dashboard from './components/dashboard/Dashboard';
import EmissionsTracker from './components/dashboard/EmissionsTracker';
import Shop from './components/dashboard/Shop';
import LoginForm from './components/login/loginForm';
import SignupForm from './components/signup/signupForm';
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
    <Router>
      <div className="app">
        <nav>
          {isLoggedIn ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/emissions">Emissions Reports</Link>
              <Link to="/shop">Shop</Link>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : null}
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <div>
                  <LocationDisplay />
                  <Dashboard />
                </div>
              ) : (
                <div className="auth-container">
                  {showLogin ? (
                    <LoginForm onLogin={handleLogin} setNotification={setNotification} />
                  ) : showSignup ? (
                    <SignupForm onLogin={handleLogin} setNotification={setNotification} />
                  ) : (
                    <div className="landing">
                      <h1>Welcome to Our App</h1>
                      <button className="auth-button" onClick={() => setShowLogin(true)}>
                        Log In
                      </button>
                      <button className="auth-button" onClick={() => setShowSignup(true)}>
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              )
            }
          />
          <Route path="/emissions" element={isLoggedIn ? <EmissionsTracker /> : <p>Please log in to view this page.</p>} />
          <Route path="/shop" element={isLoggedIn ? <Shop /> : <p>Please log in to view this page.</p>} />
        </Routes>

        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
