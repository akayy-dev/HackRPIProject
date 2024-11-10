import React, { useState, useEffect } from "react";
import {
	fetchLocationData,
	getGeolocation,
	fetchPlaceInfo,
} from "../services/locationService";
import "../styles/LocationTable.css";
import Markdown from "react-markdown";

const LocationTable = () => {
	const [places, setPlaces] = useState([]);
	const [error, setError] = useState(null);
	const [expandedRows, setExpandedRows] = useState({});
	const [loadingRows, setLoadingRows] = useState({});

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

	const toggleRow = async (index) => {
		// If a request is already in progress for this row, do nothing
		if (loadingRows[index]) return;

		// Toggle row expansion and mark it as loading if no description exists
		setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
		if (!places[index].description) {
			setLoadingRows((prev) => ({ ...prev, [index]: true }));

			try {
				const description = await fetchPlaceInfo(places[index].name);
				setPlaces((prevPlaces) =>
					prevPlaces.map((place, i) =>
						i === index ? { ...place, description } : place
					)
				);
			} catch (error) {
				console.error(
					`Error fetching description for ${places[index].name}:`,
					error
				);
			} finally {
				// Remove loading state after description fetch completes
				setLoadingRows((prev) => ({ ...prev, [index]: false }));
			}
		}
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
								<td
									onClick={() => toggleRow(index)}
									style={{ cursor: "pointer" }}
								>
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
											<div className="loading-spinner"></div> // Show loading spinner while fetching
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
