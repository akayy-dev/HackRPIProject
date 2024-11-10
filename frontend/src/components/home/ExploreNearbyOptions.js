// src/components/home/ExploreNearbyOptions.js

import React, { useState } from 'react';
import { createTripEmissions } from '../../services/emissionsService';

const ExploreNearbyOptions = ({ nearbyPlaces = [], currentLocation }) => { // Default nearbyPlaces to []
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [tripMode, setTripMode] = useState('');
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [trips, setTrips] = useState([]);

  const handlePlaceChange = (event) => {
    const place = nearbyPlaces.find((p) => p.name === event.target.value);
    setSelectedPlace(place);
  };

  const handleModeChange = (event) => {
    setTripMode(event.target.value);
  };

  const createTrip = async () => {
    if (!selectedPlace || !tripMode) {
      alert("Please select a place and travel mode.");
      return;
    }
    
    const origin = { lat: currentLocation?.lat, long: currentLocation?.long };
    const destination = { lat: selectedPlace.lat, long: selectedPlace.long };

    try {
      const emissions = await createTripEmissions(origin, destination, tripMode);
      setTotalEmissions((prevTotal) => prevTotal + emissions);
      setTrips((prevTrips) => [
        ...prevTrips,
        { start: currentLocation.name, destination: selectedPlace.name, emissions }
      ]);
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  return (
    <div>
      <h3>Total Emissions: {parseFloat(totalEmissions).toFixed(2)} kg CO₂</h3>

      <div>
        <label>Select a Place: </label>
        <select value={selectedPlace ? selectedPlace.name : ''} onChange={handlePlaceChange}>
          <option value="">Select a place</option>
          {nearbyPlaces.map((place, index) => (
            <option key={index} value={place.name}>
              {place.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Travel Mode: </label>
        <select value={tripMode} onChange={handleModeChange}>
          <option value="">Select Mode</option>
          <option value="walking">Walking</option>
          <option value="bicycling">Biking</option>
          <option value="transit">Public Transportation</option>
          <option value="driving">Driving</option>
        </select>
      </div>

      <button onClick={createTrip}>Create Trip</button>

      <h2>Emissions Tracker</h2>
      <table>
        <thead>
          <tr>
            <th>Start Place</th>
            <th>Destination</th>
            <th>CO₂ Emissions (kg)</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, index) => (
            <tr key={index}>
              <td>{trip.start}</td>
              <td>{trip.destination}</td>
              <td>{trip.emissions.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExploreNearbyOptions;
