// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import TripForm from '../components/emissions/TripForm';
import LocationTable from '../components/home/LocationTable.js';
import LocationDisplay from '../components/home/locationDisplay.js';
import { getGeolocation, fetchLocationData } from '../services/locationService';

const HomePage = () => {
  const [trips, setTrips] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  const addTrip = (trip) => {
    setTrips((prevTrips) => [...prevTrips, trip]);
  };

  useEffect(() => {
    const loadLocationData = async () => {
      try {
        const location = await getGeolocation();
        setCurrentLocation(location);

        if (location) {
          const places = await fetchLocationData(location.latitude, location.longitude);
          setNearbyPlaces(places);
        }
      } catch (error) {
        console.error('Error loading location data:', error);
      }
    };

    loadLocationData();
  }, []);

  return (
    <div>
      <LocationDisplay />
      {currentLocation && (
        <TripForm nearbyPlaces={nearbyPlaces} currentLocation={currentLocation} addTrip={addTrip} />
      )}
      <LocationTable nearbyPlaces={nearbyPlaces} />
    </div>
  );
};

export default HomePage;
