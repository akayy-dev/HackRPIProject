import React, { useState, useEffect } from 'react';

const EmissionsTracker = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Load trips from local storage on component mount
    const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];
    setTrips(savedTrips);
  }, []);

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
