import React, { useState } from 'react';

const ExploreNearbyOptions = ({ nearbyPlaces, currentLocation }) => {
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

  const createTrip = () => {
    if (!selectedPlace || !tripMode) {
      alert("Please select a place and travel mode.");
      return;
    }
  
    const origin = nearbyPlaces[0];
    const o_lat = origin?.lat || currentLocation?.lat;
    const o_long = origin?.long || currentLocation?.long;
  
    if (o_lat == null || o_long == null) {
      console.error("Origin coordinates are undefined.");
      alert("Origin coordinates are missing.");
      return;
    }
  
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
        const emissions = data;
        if (emissions != null) {
          setTotalEmissions((prevTotal) => prevTotal + emissions);

          // Add new trip to the trips array for tracking
          setTrips((prevTrips) => [
            ...prevTrips,
            { start: currentLocation.name || "Current Location", destination: selectedPlace.name, emissions }
          ]);
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
