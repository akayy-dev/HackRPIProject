// src/services/locationService.js

// import axios from 'axios';

export const fetchLocationData = async () => {
    // Commented out the actual API call for testing
    /*
    try {
      const response = await axios.get('/api/location'); // Replace with your backend endpoint
      return response.data;
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
    */
  
    // Hard-coded data for testing
    return {
      name: "Test Location",
      imageUrl: "https://via.placeholder.com/600x400?text=Location+Image"
    };
  };
  