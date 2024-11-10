// src/components/home/CreateTrip.js
import React, { useState } from 'react';
import { createTripEmissions } from '../../services/emissionsService';

const CreateTrip = ({ setNotification }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [tripMode, setTripMode] = useState('');

  const handleCreateTrip = async () => {
    if (!selectedPlace || !tripMode) {
      setNotification({ message: 'Please select a place and travel mode.', type: 'error' });
      return;
    }
    try {
      const origin = { lat: 40.73061, long: -73.935242 }; // Example origin; replace with dynamic data
      const emissions = await createTripEmissions(origin, selectedPlace, tripMode);
      // Optionally: Pass emissions data to EmissionsTracker via a global state or context
      setNotification({ message: 'Trip created and emissions updated!', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Error creating trip emissions.', type: 'error' });
    }
  };

  return (
    <div>
      <h2>Create a Trip</h2>
      {/* Inputs for selecting place and mode */}
      <button onClick={handleCreateTrip}>Create Trip</button>
    </div>
  );
};

export default CreateTrip;
