// src/components/NearbyOptionsTable.js

import React, { useEffect, useState } from 'react';
import { fetchLocationData } from '../services/locationService';

const LocationTable = ({ latitude, longitude }) => {
  const [places, setPlaces] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLocationData(latitude, longitude);
        setPlaces(data);
      } catch (error) {
        console.error('Failed to load location data', error);
      }
    };
    loadData();
  }, [latitude, longitude]);

  const toggleRow = (index) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [index]: !prevExpandedRows[index],
    }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Address</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {places.map((place, index) => (
          <tr key={index}>
            <td>{place.name}</td>
            <td>{place.type}</td>
            <td>{place.address}</td>
            <td onClick={() => place.description && toggleRow(index)} style={{ cursor: place.description ? 'pointer' : 'default' }}>
              {place.description ? (
                <div>
                  {expandedRows[index] ? (
                    <div className="description expanded">{place.description}</div>
                  ) : (
                    <span className="description-preview">Click to view description</span>
                  )}
                </div>
              ) : (
                <span>No description available</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LocationTable;
