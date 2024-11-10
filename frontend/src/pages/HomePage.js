// src/pages/HomePage.js
import React from 'react';
import LocationDisplay from '../components/home/LocationDisplay';
import LocationTable from '../components/home/LocationTable';
import ExploreNearbyOptions from '../components/home/ExploreNearbyOptions';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <LocationDisplay />
    <LocationTable />
  </div>
);

export default HomePage;
