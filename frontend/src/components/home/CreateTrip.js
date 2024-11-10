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
      console.log("Creating trip with:", origin, selectedPlace, tripMode);
      const emissions = await createTripEmissions(origin, selectedPlace, tripMode);
      console.log("Emissions for trip:", emissions);
      setNotification({ message: 'Trip created and emissions updated!', type: 'success' });
    } catch (error) {
      console.error("Error creating trip emissions:", error);
      setNotification({ message: 'Error creating trip emissions.', type: 'error' });
    }
  };

  return (
    <div>
      <h2>Create a Trip</h2>
      <button onClick={handleCreateTrip}>Create Trip</button>
    </div>
  );
};

export default CreateTrip;
