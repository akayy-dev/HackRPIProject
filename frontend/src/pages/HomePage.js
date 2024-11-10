// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import TripForm from '../components/emissions/TripForm';
import LocationTable from '../components/home/LocationTable';
import LocationDisplay from '../components/home/locationDisplay';
import { getGeolocation, fetchLocationData } from '../services/locationService';
import '../styles/HomePage.css';

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
    <div className="home-page">
      <LocationDisplay />
      {currentLocation && (
        <TripForm nearbyPlaces={nearbyPlaces} currentLocation={currentLocation} addTrip={addTrip} />
      )}
      <LocationTable nearbyPlaces={nearbyPlaces} setNearbyPlaces={setNearbyPlaces} />
    </div>
  );
};

export default HomePage;
