import React from 'react';
import '../styles/logoutButton.css';

const LogoutButton = ({ onLogout }) => (
  <button className="logout-button" onClick={onLogout}>
    Logout
  </button>
);

export default LogoutButton;
