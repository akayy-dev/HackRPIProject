// src/services/useGeolocation.js

import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
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

  return { coordinates, error };
};

export default useGeolocation;
