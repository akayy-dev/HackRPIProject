import React, { useState } from 'react';
import { createTripEmissions } from '../../services/emissionsService';

const TripForm = ({ nearbyPlaces, currentLocation, addTrip }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [tripMode, setTripMode] = useState('');

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

    try {
      const emissions = await createTripEmissions(
        { lat: currentLocation.latitude, long: currentLocation.longitude },
        { lat: selectedPlace.lat, long: selectedPlace.long },
        tripMode
      );

      const newTrip = {
        start: currentLocation.name || "Current Location",
        destination: selectedPlace.name,
        emissions
      };

      // Save to local storage
      const existingTrips = JSON.parse(localStorage.getItem('trips')) || [];
      const updatedTrips = [...existingTrips, newTrip];
      localStorage.setItem('trips', JSON.stringify(updatedTrips));

      // Optional: call addTrip if still needed for component state
      addTrip(newTrip);
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  return (
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

      <label>Select Travel Mode: </label>
      <select value={tripMode} onChange={handleModeChange}>
        <option value="">Select Mode</option>
        <option value="walking">Walking</option>
        <option value="bicycling">Biking</option>
        <option value="transit">Public Transportation</option>
        <option value="driving">Driving</option>
      </select>

      <button onClick={createTrip}>Create Trip</button>
    </div>
  );
};

export default TripForm;
