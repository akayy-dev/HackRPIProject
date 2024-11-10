// src/pages/EmissionsReportPage.js

import React from 'react';
import ExploreNearbyOptions from '../components/emissions/EmissionsTracker.js';

const EmissionsReportPage = ({ trips }) => (
  <div>
    <h1>Emissions Report</h1>
    <ExploreNearbyOptions trips={trips} />
  </div>
);

export default EmissionsReportPage;
