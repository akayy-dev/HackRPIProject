import React from 'react';
import '../../styles/signupComplete.css';

const SignupComplete = ({ formData, onLogin }) => {
  const handleComplete = () => {
    sessionStorage.setItem('user', JSON.stringify(formData));
    onLogin();
  };

  return (
    <div className="signup-complete">
      <h2>Thank you for signing up!</h2>
      <p>Your account has been created.</p>
      <button onClick={handleComplete}>Finish</button>
    </div>
  );
};

export default SignupComplete;
