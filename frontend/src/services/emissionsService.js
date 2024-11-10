// src/services/emissionsService.js
import axios from 'axios';

export const createTripEmissions = async (origin, destination, mode) => {
  try {
    const queryString = `o_lat=${origin.lat}&o_long=${origin.long}&d_lat=${destination.lat}&d_long=${destination.long}&mode=${mode}`;
    const response = await axios.post(`http://127.0.0.1:8080/get_trip_emissions?${queryString}`);
    return response.data; // Assume data contains emissions information
  } catch (error) {
    console.error('Error creating trip emissions:', error);
    throw error;
  }
};
