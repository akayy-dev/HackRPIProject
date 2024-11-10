import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import LocationDisplay from './components/locationDisplay';
import LocationTable from './components/LocationTable';
import Shop from './components/Shop';
import Navbar from './components/navbar/Navbar';
import Notification from './components/notification';
import useAuthentication from './hooks/useAuthentication';
import useNotification from './hooks/useNotification';
import './styles/App.css';

const MainApp = () => {
  const { isLoggedIn, login, logout } = useAuthentication();
  const { notification, setNotification, closeNotification } = useNotification();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home');

  const handleLogin = (userData) => login(userData, setNotification);

  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          <Navbar setActiveComponent={setActiveComponent} logout={() => logout(setNotification)} />
          <div className="content">
            {activeComponent === 'shop' && <Shop />}
            {activeComponent === 'home' && (
              <div>
                <LocationDisplay />
                <LocationTable />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="auth-container">
          {showLogin ? (
            <AuthForm onSubmit={handleLogin} formType="login" setNotification={setNotification} />
          ) : showSignup ? (
            <AuthForm onSubmit={handleLogin} formType="signup" setNotification={setNotification} />
          ) : (
            <div className="landing">
              <h1>Welcome to Our App</h1>
              <button className="auth-button" onClick={() => setShowLogin(true)}>Log In</button>
              <button className="auth-button" onClick={() => setShowSignup(true)}>Sign Up</button>
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
