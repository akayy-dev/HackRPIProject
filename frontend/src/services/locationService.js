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

export const fetchPlaceInfo = async (placeName) => {
  // try {
  //   const response = await axios.get(`http://127.0.0.1:8080/get_place_info`, {
  //     params: { placeName: encodeURIComponent(placeName) },
  //   });
  //   return response.data || null;
  // } catch (error) {
  //   console.error(`Error fetching info for ${placeName}:`, error);
  //   return null;
  // }
  // Test with a static place name without spaces
const response = await axios.get('http://127.0.0.1:8080/get_place_info?name=Washington%20Square%20Park');

return response.data;
};


// Commented out original geolocation logic and added hardcoded coordinates
export const getGeolocation = () => {
  return new Promise((resolve) => {
    resolve({
      latitude: 40.73090439289119,
      longitude: -73.99732690284772,
    });
  });
};
