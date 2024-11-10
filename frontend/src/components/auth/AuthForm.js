import React, { useState } from 'react';
import '../../styles/authForm.css';

const AuthForm = ({ onSubmit, formType, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === 'signup' && password !== confirmPassword) {
      setNotification({ message: 'Passwords do not match!', type: 'error' });
      return;
    }
    onSubmit({ username, password });
  };

  return (
    <div className="auth-form">
      <h2>{formType === 'login' ? 'Log In' : 'Sign Up'}</h2>
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
      {formType === 'signup' && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      )}
      <button onClick={handleSubmit}>{formType === 'login' ? 'Log In' : 'Sign Up'}</button>
    </div>
  );
};

export default AuthForm;
