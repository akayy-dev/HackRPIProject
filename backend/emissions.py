import requests
from os import getenv

# Set up your API key and endpoint
api_key = getenv("GOOG_KEY")
endpoint = 'https://maps.googleapis.com/maps/api/distancematrix/json'

class EmmisionsCalculator:
    def __init__(self, GOOG_KEY:str):
        self.api_key = GOOG_KEY
        self.emms_consts = {
            'driving': 150,
            'walking': 0,
            'bicycling': 0,
            'bus': 90,
            'rail': 50
        }
        
    def get_dist_metric(self, origin: str, destination: str, mode: str, transit_mode: str = None) -> float:
        """
        origin: The long and lat cords of the originating position as a string
        destination: The long and lat cords of the desired destination as a string
        mode: The mode of transportation in values 'driving', 'walking', 'bicycling', or 'transit'
        transit_mode: Optional mode for the specific type of transit in values 'bus', 'rail'
        """
        params = {
            'origin': origin,
            'destination': destination,
            'mode': mode,
            'departure_time': 'now',
            'key': self.api_key
        }
        if mode == 'transit':
            params['transit_mode'] = transit_mode

        # Make the request
        response = requests.get(endpoint, params=params)
        data = response.json()
        distance = data['routes'][0]['legs'][0]['distance']['value'] / 1000 #kms of the trip

        return distance

    def calc_emmisions(self, o_lat: float, o_long: float, d_lat: float, d_long: float, mode: str, transit_mode: str = None):
        """
        o_lat: Lattitude of the origin
        o_long: Longitude of the origin
        d_lat: Lattitde of the destination
        d_long: Longitude of the destination
        mode: The mode of transportation in values 'driving', 'walking', 'bicycling', or 'transit'
        transit_mode: Optional mode for the specific type of transit in values 'bus', 'rail'
        """
        origin = f'{o_lat}, {o_long}'
        destination = f'{d_lat}, {d_long}'
        distance = self.get_dist_metric(origin, destination, mode, transit_mode)
        if mode != 'transit':
            return distance * self.emms_consts['mode']
        elif transit_mode == 'bus':
            return distance * self.emms_consts['bus']
        elif transit_mode == 'rail':
            return distance * self.emms_consts['rail']
        
