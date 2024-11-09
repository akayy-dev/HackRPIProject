// src/components/locationDisplay.js

import React, { useEffect, useState } from 'react';
import { fetchLocationData } from '../services/locationService';
import '../styles/locationDisplay.css';

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const data = await fetchLocationData();
        setLocation(data);
      } catch (error) {
        console.error('Failed to load location data', error);
      }
    };

    getLocationData();
  }, []);

  if (!location) return <p>Loading...</p>;

  return (
    <div className="location-display">
      <h1>{location.name}</h1>
      <img src={location.imageUrl} alt={location.name} />
    </div>
  );
};

export default LocationDisplay;
