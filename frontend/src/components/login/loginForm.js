// src/components/login/loginForm.js

import React, { useState } from 'react';
import '../../styles/loginForm.css';

const LoginForm = ({ onLogin, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.username === username && user.password === password) {
      onLogin();
    } else {
      setNotification({ message: 'Invalid username or password', type: 'error' });
    }
  };

  return (
    <div className="login-form">
      <h2>Log In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="login-button" onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginForm;
