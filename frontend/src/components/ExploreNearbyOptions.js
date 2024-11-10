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
  
    // Get origin coordinates from the first item in the nearbyPlaces array or fallback to currentLocation
    const origin = nearbyPlaces[0];
    const o_lat = origin?.lat || currentLocation?.lat;
    const o_long = origin?.long || currentLocation?.long;
  
    // Check if origin coordinates are available
    if (o_lat == null || o_long == null) {
      console.error("Origin coordinates are undefined. Please ensure location data is available.");
      alert("Origin coordinates are missing. Please check your location settings.");
      return;
    }
  
    // Ensure the selected place has valid destination coordinates
    const { lat: d_lat, long: d_long } = selectedPlace;
    if (d_lat == null || d_long == null) {
      console.error("Selected place does not have valid coordinates:", selectedPlace);
      alert("The selected place does not have valid coordinates.");
      return;
    }
  
    const queryString = `o_lat=${o_lat}&o_long=${o_long}&d_lat=${d_lat}&d_long=${d_long}&mode=${tripMode}`;
  
    fetch(`http://127.0.0.1:8080/get_trip_emissions?${queryString}`, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data); // Log the entire response data to check its structure
        const emissions = data; // Directly use the response data
  
        if (emissions != null) { // Check if emissions data exists
          setTotalEmissions((prevTotal) => prevTotal + emissions);
        } else {
          console.error("Emissions data is missing in the response:", data);
        }
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
          <option value="bicycling">Biking</option>
          <option value="transit">Public Transportation</option>
          <option value="driving">Driving</option>
        </select>
      </div>

      <button onClick={createTrip}>Create Trip</button>
    </div>
  );
};

export default ExploreNearbyOptions;
