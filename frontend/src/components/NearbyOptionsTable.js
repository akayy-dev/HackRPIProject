// src/components/NearbyOptionsTable.js

import React, { useState, useEffect } from 'react';
import { fetchLocationData, getGeolocation } from '../services/locationService';
import '../styles/NearbyOptionsTable.css';

const NearbyOptionsTable = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNearbyPlaces = async () => {
      try {
        const { latitude, longitude } = await getGeolocation();
        const data = await fetchLocationData(latitude, longitude);
        setPlaces(data);
      } catch (error) {
        setError(error);
      }
    };

    loadNearbyPlaces();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="nearby-options">
      <h2>Explore Nearby Options</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Address</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place, index) => (
            <tr key={index}>
              <td>{place.name}</td>
              <td>{place.type}</td>
              <td>{place.address}</td>
              <td>
                <img src={place.image} alt={place.name} width="100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NearbyOptionsTable;
