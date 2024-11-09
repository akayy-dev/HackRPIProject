// src/components/login/loginForm.js

import React, { useState } from 'react';
import { getUser } from '../../services/userService';
import '../../styles/loginForm.css';

const LoginForm = ({ onLogin, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = getUser();
    console.log('Retrieved user from sessionStorage:', savedUser);  // Debugging line

    if (savedUser && savedUser.username === username && savedUser.password === password) {
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
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginForm;
