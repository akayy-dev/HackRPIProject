// src/components/LocationTable.js

import React, { useState } from "react";
import Markdown from "react-markdown";
import "../../styles/LocationTable.css";

const LocationTable = ({ nearbyPlaces }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [loadingRows, setLoadingRows] = useState({});

  const toggleRow = async (index) => {
    if (loadingRows[index]) return;

    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
    if (!nearbyPlaces[index].description) {
      setLoadingRows((prev) => ({ ...prev, [index]: true }));

      try {
        const description = await fetchPlaceInfo(nearbyPlaces[index].name);
        setNearbyPlaces((prevPlaces) =>
          prevPlaces.map((place, i) =>
            i === index ? { ...place, description } : place
          )
        );
      } catch (error) {
        console.error(`Error fetching description for ${nearbyPlaces[index].name}:`, error);
      } finally {
        setLoadingRows((prev) => ({ ...prev, [index]: false }));
      }
    }
  };

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
          {nearbyPlaces.map((place, index) => (
            <React.Fragment key={index}>
              <tr>
                <td onClick={() => toggleRow(index)} style={{ cursor: "pointer" }}>
                  {place.name}
                  {expandedRows[index] ? " ▲" : " ▼"}
                </td>
                <td>{place.type}</td>
                <td>{place.address}</td>
                <td>
                  <img src={place.image} alt={place.name} width="100" />
                </td>
              </tr>
              {expandedRows[index] && (
                <tr>
                  <td colSpan="4" className="description-cell">
                    {loadingRows[index] ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <div className="description-content">
                        <Markdown>{place.description}</Markdown>
                      </div>
                    )}
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
