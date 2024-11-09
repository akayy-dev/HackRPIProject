// src/components/signup/signupForm.js

import React, { useState } from 'react';
import '../../styles/signupForm.css';

const SignupForm = ({ onLogin, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setNotification({ message: 'Passwords do not match!', type: 'error' });
      return;
    }

    // Mock signup process
    sessionStorage.setItem('user', JSON.stringify({ username }));
    setNotification({ message: 'Signup successful!', type: 'success' });
    onLogin();
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupForm;
