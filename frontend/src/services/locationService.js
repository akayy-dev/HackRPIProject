// src/services/locationService.js

import axios from 'axios';

export const fetchLocationData = async (lat, long) => {
  try {
    // Ensure lat and long are numbers
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error("Invalid latitude or longitude values");
    }

    const response = await axios.get('http://127.0.0.1:8080/get_nearby', {
      params: { lat: latitude, long: longitude },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
};

export const getGeolocation = () => {
  return new Promise((resolve) => {
    // Hardcoded coordinates for testing
    resolve({
      latitude: 40.73090439289119,
      longitude: -73.99732690284772,
    });
  });
};

// export const getGeolocation = () => {
//   return new Promise((resolve, reject) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           resolve({ latitude, longitude });
//         },
//         (error) => {
//           console.error('Error getting geolocation:', error);
//           reject('Error getting geolocation');
//         }
//       );
//     } else {
//       reject('Geolocation is not supported by your browser');
//     }
//   });
// };
