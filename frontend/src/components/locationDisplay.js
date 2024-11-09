// src/components/locationDisplay.js

import React, { useState, useEffect } from 'react';
import { fetchLocationData, getGeolocation } from '../services/locationService';

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLocationData = async () => {
      try {
        const { latitude, longitude } = await getGeolocation();
        const data = await fetchLocationData(latitude, longitude);

        if (data && data.length > 0) {
          const place = data[0];
          setLocation({ name: place.name, imageUrl: place.image });
        } else {
          setError("No nearby locations found.");
        }
      } catch (error) {
        setError(error);
      }
    };

    loadLocationData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!location) return <p>Loading...</p>;

  return (
    <div className="location-display">
      <h1>{location.name}</h1>
      <img src={location.imageUrl} alt={location.name} />
    </div>
  );
};

export default LocationDisplay;
