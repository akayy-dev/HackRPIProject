// src/components/Navbar.js

import React from 'react';
import '../styles/navbar.css';

const Navbar = ({ logout }) => (
  <nav className="navbar">
    <button className="nav-link logo-link" onClick={() => window.location.href = '/'}>
      <img src="/image.png" alt="Green Tag Logo" className="navbar-logo" />
    </button>
    <button className="nav-link" onClick={() => window.location.href = '/emissions-report'}>Emissions Reports</button>
    <button className="nav-link" onClick={() => window.location.href = '/shop'}>Shop</button>
    <button className="logout-button" onClick={logout}>Logout</button>
  </nav>
);

export default Navbar;
