// src/components/auth/AuthForm.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/authForm.css';

const AuthForm = ({ onSubmit, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    onSubmit({ username, password }, formType);
  };

  return (
    <div className="auth-form">
      <img src="/image.png" alt="Logo" className="auth-logo" />
      <h2>GREEN_TAG</h2>
      <p>Track → Earn Points → Redeem</p>
      <form>
        <div className="input-group">
          <label>Email ID</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="student@school.edu"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={(e) => handleSubmit(e, 'login')} className="auth-submit">
            Login
          </button>
          <button type="button" onClick={(e) => handleSubmit(e, 'signup')} className="auth-submit">
            Sign Up
          </button>
        </div>
      </form>
      <button onClick={() => setNotification({ message: 'Forgot password?', type: 'info' })}>
        Forgot Password?
      </button>
    </div>
  );
};

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default AuthForm;
