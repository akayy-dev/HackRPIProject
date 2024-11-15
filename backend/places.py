import googlemaps
import wikipedia
from os import getenv

class PlacesClient:
	def __init__(self, API_KEY: str):
		self.client = googlemaps.Client(API_KEY)
		self._KEY = API_KEY # making the key an attribute is stupid, but i need it to get the image url.
	
	def convert_coords(self, lat: float, lng: float, types: list[str]) -> list[dict]:
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
								'lat': result['geometry']['location']['lat'],
								'long': result['geometry']['location']['lng'],
								'address': result['vicinity'], # test this actually works before deploying
								'image': image_url
							}
							places.append(place_json)
		return places
	def get_summary(self, place: str) -> dict:
		"""Get a summary of a place from wikipedia, if the page doesn't exist, return none."""
		page: wikipedia.WikipediaPage = None
		try:
			page = wikipedia.page(place)
		except wikipedia.exceptions.PageError:
			print("Page Not Found")
			return None
		
		response = {
			'page_title': page.title,
			"page_url": page.url,
			"summary": page.summary,
			"content": page.content
			}
		return response
	def get_location_from_coordinates(self, lat: float, lng: float) -> dict:
		"""Get the human-readable address from coordinates"""
		geocode_result = self.client.reverse_geocode((lat, lng))

			
		return geocode_result


if __name__ == '__main__':
	KEY = getenv("PLACES_API_KEY")
	client = PlacesClient(KEY)
	types = ["tourist_attraction", "university", "park", "subway_station", "transit_station", "school", "library", "embassy", "courthouse", "city_hall", "restaurant"]
	WASH_PARK = (40.73090439289119, -73.99732690284772)
	places = client.convert_coords(WASH_PARK[0], WASH_PARK[1], types)
	name = places[0]['name']
	print(name)

	print(client.get_location_from_coordinates(WASH_PARK[0], WASH_PARK[1]))