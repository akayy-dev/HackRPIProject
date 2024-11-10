import React from 'react';
import '../styles/navbar.css';

const Navbar = ({ setActiveComponent, logout }) => (
  <nav className="navbar">
    <button className="nav-link" onClick={() => setActiveComponent('home')}>Home</button>
    <button className="nav-link" onClick={() => setActiveComponent('emissions')}>Emissions Reports</button>
    <button className="nav-link" onClick={() => setActiveComponent('shop')}>Shop</button>
    <button className="logout-button" onClick={logout}>Logout</button>
  </nav>
);

export default Navbar;
