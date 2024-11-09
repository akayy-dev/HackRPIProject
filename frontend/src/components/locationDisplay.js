// src/components/locationDisplay.js

import React, { useState, useEffect } from 'react';
import { fetchLocationData } from '../services/locationService';

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Fetch location data from the backend
            const data = await fetchLocationData(latitude, longitude);
            console.log("Frontend received data:", data);

            // Extract the first item from the array, if it exists
            if (data && data.length > 0) {
              const place = data[0];  // Get the first place in the array
              setLocation({
                name: place.name,
                imageUrl: place.image,
              });
            } else {
              setError("No nearby locations found.");
            }
          } catch (error) {
            setError('Error fetching location data');
            console.error(error);
          }
        },
        (error) => {
          setError('Error getting your location');
          console.error(error);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!location) {
    return <p>Loading...</p>;
  }

  return (
    <div className="location-display">
      <h1>{location.name}</h1>
      <img src={location.imageUrl} alt={location.name} />
    </div>
  );
};

export default LocationDisplay;
