import React, { useState } from 'react';
import '../../styles/usernamePassword.css';

const UsernamePassword = ({ formData, updateFormData, onNext }) => {
  const [username, setUsername] = useState(formData.username);
  const [password, setPassword] = useState(formData.password);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    updateFormData({ username, password });
    onNext();
  };

  return (
    <div className="username-password">
      <h2>Create Your Account</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default UsernamePassword;
