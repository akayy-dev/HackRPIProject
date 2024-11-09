import googlemaps

class PlacesClient:
	def __init__(self, API_KEY: str):
		self.client = googlemaps.Client(API_KEY)
		self._KEY = API_KEY # making the key an attribute is stupid, but i need it to get the image url.
	
	def convert_coords(self, lat: float, lng: float, types: list[str]):
		"""Convert location coordinates to human-readable address and image"""
		places = []
		for place_type in types:
			geocode_result = self.client.places_nearby(location=(lat, lng), radius=500, type=place_type)

			if geocode_result['results']:
				for result in geocode_result['results']:
							image_url = None

							if result.get('photos'): # if there a photo for this place, get the url
								photo_url = result['photos'][0]['photo_reference']
								image_url = f'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_url}&key={self._KEY}'

							place_json = {
								'name': result['name'],
								'type': place_type,
								'address': result['vicinity'], # test this actually works before deploying
								'image': image_url
							}
							places.append(place_json)
		return places


if __name__ == '__main__':
	client = PlacesClient('AIzaSyAnVknmf5xdz1jg0H0_CJvcCU7h_kW6pcU')
	types = ["tourist_attraction", "university"]
	places = client.convert_coords(40.73090439289119, -73.99732690284772, types)
	print(places)
						

