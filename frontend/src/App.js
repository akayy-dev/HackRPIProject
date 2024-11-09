// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LocationDisplay from './components/locationDisplay';
import LocationTable from './components/LocationTable';
import EmissionsTracker from './components/EmissionsTracker';
import Shop from './components/Shop';
import LoginForm from './components/login/loginForm';
import SignupForm from './components/signup/signupForm';
import Notification from './components/notification';
import './styles/App.css';

const MainApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('user') !== null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home'); // Track the active component

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
    setActiveComponent('home'); // Reset to home on logout
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'shop':
        return <Shop />;
      case 'emissions':
        return <EmissionsTracker />;
      default:
        return (
          <div>
            <LocationDisplay />
            <LocationTable />
          </div>
        );
    }
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          <nav className="navbar">
            <button className="nav-link" onClick={() => setActiveComponent('home')}>Home</button>
            <button className="nav-link" onClick={() => setActiveComponent('emissions')}>Emissions Reports</button>
            <button className="nav-link" onClick={() => setActiveComponent('shop')}>Shop</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </nav>
          <div className="content">
            {renderContent()}
          </div>
        </>
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

const App = () => (
  <Router>
    <MainApp />
  </Router>
);

export default App;
