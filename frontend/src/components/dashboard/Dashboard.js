// src/components/dashboard/Dashboard.js

import React from 'react';
import NearbyOptionsTable from '../NearbyOptionsTable';
import '../../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Explore Nearby Options</h1>
      <NearbyOptionsTable />
      {/* Other dashboard content can go here */}
    </div>
  );
};

export default Dashboard;
