import React from 'react';

const ExploreNearbyOptions = ({ trips }) => {
  console.log("Displaying trips in ExploreNearbyOptions:", trips);
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

export default ExploreNearbyOptions;
