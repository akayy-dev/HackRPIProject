// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmissionsReportPage from './pages/EmissionsReportPage';
import ShopPage from './pages/ShopPage';
import Navbar from './components/Navbar';
import './styles/App.css';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/emissions-report" element={<EmissionsReportPage />} />
      <Route path="/shop" element={<ShopPage />} />
    </Routes>
  </Router>
);

export default App;
