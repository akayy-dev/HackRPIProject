import React, { useState, useEffect } from 'react';
import { fetchLocationData, getGeolocation, fetchPlaceInfo } from '../services/locationService';
import '../styles/LocationTable.css';

const LocationTable = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const loadNearbyPlaces = async () => {
      try {
        const { latitude, longitude } = await getGeolocation();
        const data = await fetchLocationData(latitude, longitude);

        // Log the initial data fetched to verify structure
        console.log("Initial places data:", data);

        // Populate the table initially with places data only
        setPlaces(data);

        // Fetch description for each place and update each entry as it arrives
        const updatedPlaces = await Promise.all(
          data.map(async (place) => {
            const description = await fetchPlaceInfo(place.name);
            console.log(`Fetched description for ${place.name}:`, description); // Log each description
            return { ...place, description };
          })
        );

        // Log updated places with descriptions
        console.log("Updated places with descriptions:", updatedPlaces);
        setPlaces(updatedPlaces); // Update the state with descriptions
      } catch (error) {
        setError(error);
      }
    };

    loadNearbyPlaces();
  }, []);

  const toggleRow = (index) => {
    console.log('Clicked row index:', index); // Log the clicked row index
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

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
            <React.Fragment key={index}>
              <tr>
                <td onClick={() => place.description && toggleRow(index)} style={{ cursor: place.description ? 'pointer' : 'default' }}>
                  {place.name}
                  {place.description && (
                    <span className="expand-icon">{expandedRows[index] ? '▲' : '▼'}</span>
                  )}
                </td>
                <td>{place.type}</td>
                <td>{place.address}</td>
                <td>
                  <img src={place.image} alt={place.name} width="100" />
                </td>
              </tr>
              {place.description && expandedRows[index] && (
                <tr>
                  <td colSpan="4" className="description-cell">
                    <div className="description-content">{place.description}</div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;
