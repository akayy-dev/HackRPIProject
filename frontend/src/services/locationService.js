import axios from "axios";

export const fetchLocationData = async (lat, long) => {
	try {
		const response = await axios.get("http://127.0.0.1:8080/get_nearby", {
			params: { lat, long },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching location data:", error);
		throw error;
	}
};

export const fetchPlaceInfo = async (placeName) => {
	try {
		// Dynamically encode `placeName` to ensure compatibility with URL
		const response = await axios.get("http://127.0.0.1:8080/get_place_info", {
			params: { name: placeName },
		});
		return response.data || null;
	} catch (error) {
		console.error(`Error fetching info for ${placeName}:`, error);
		return null;
	}
};

// Commented out original geolocation logic and added hardcoded coordinates
export const getGeolocation = (debug) => {
	if (debug) {
		return new Promise((resolve) => {
			resolve({
				latitude: 40.73090439289119,
				longitude: -73.99732690284772,
			});
		});
	} else {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},
				(error) => {
					console.error("Error getting geolocation:", error);
					reject(error);
				}
			);
		});
	}
};
