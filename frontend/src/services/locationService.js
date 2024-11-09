// src/services/locationService.js

import axios from 'axios';

export const fetchLocationData = async (lat, long) => {
  try {
    const response = await axios.get('http://127.0.0.1:8080/get_nearby', {
      params: { lat, long },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
};
