import React, { useState } from 'react';

const ExploreNearbyOptions = ({ nearbyPlaces, currentLocation }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [tripMode, setTripMode] = useState('');
  const [totalEmissions, setTotalEmissions] = useState(0);

  const handlePlaceChange = (event) => {
    const place = nearbyPlaces.find((p) => p.name === event.target.value);
    setSelectedPlace(place);
  };

  const handleModeChange = (event) => {
    setTripMode(event.target.value);
  };

  const createTrip = () => {
    if (!selectedPlace || !tripMode) {
      alert("Please select a place and travel mode.");
      return;
    }
  
    // Get origin coordinates from the first item in the nearbyPlaces array
    const origin = nearbyPlaces[0];
    const o_lat = origin?.lat || currentLocation.lat;
    const o_long = origin?.long || currentLocation.long;
  
    // Ensure the selected place has valid destination coordinates
    if (selectedPlace.lat == null || selectedPlace.long == null) {
      console.error("Selected place does not have valid coordinates:", selectedPlace);
      alert("The selected place does not have valid coordinates.");
      return;
    }
  
    const { lat: d_lat, long: d_long } = selectedPlace; // Directly use selectedPlace's lat and long
  
    const tripData = {
      o_lat,
      o_long,
      d_lat,
      d_long,
      mode: tripMode,
      transit_mode: tripMode === 'public_transportation' ? 'bus' : null,
    };
  
    console.log('Creating trip with data:', {
      o_lat,
      o_long,
      d_lat,
      d_long,
      mode: tripMode,
    });
  
    fetch('http://127.0.0.1:8080/get_trip_emissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
    })
      .then((response) => response.json())
      .then((data) => {
        const emissions = data.emissions;
        setTotalEmissions((prevTotal) => prevTotal + emissions);
      })
      .catch((error) => {
        console.error('Error creating trip:', error);
      });
  };
  
  
  
  

  return (
    <div>
      <h3>Total Emissions: {totalEmissions} kg CO₂</h3>

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
          <option value="biking">Biking</option>
          <option value="public_transportation">Public Transportation</option>
          <option value="driving">Driving</option>
        </select>
      </div>

      <button onClick={createTrip}>Create Trip</button>
    </div>
  );
};

export default ExploreNearbyOptions;
