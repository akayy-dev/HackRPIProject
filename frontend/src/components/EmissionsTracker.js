import React, { useState } from 'react';

const EmissionsTracker = () => {
  const [trips, setTrips] = useState([]);

  const addTrip = (start, destination, emissions) => {
    const newTrip = { start, destination, emissions };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  return (
    <div>
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

export default EmissionsTracker;
