import requests
from os import getenv

class EmissionsCalculator:
    def __init__(self, GOOG_KEY:str):
        self.api_key = GOOG_KEY
        self.ems_consts = {
            'driving': 150,
            'walking': 0,
            'bicycling': 0,
            'transit': 60
        }
        self.endpoint = "https://maps.googleapis.com/maps/api/directions/json"
        
    def get_dist_metric(self, origin: str, destination: str, mode: str) -> float:
        """
        origin: The long and lat cords of the originating position as a string
        destination: The long and lat cords of the desired destination as a string
        mode: The mode of transportation in values 'driving', 'walking', 'bicycling', or 'transit'
        """
        params = {
            'origin': origin,
            'destination': destination,
            'mode': mode,
            'departure_time': 'now',
            'key': self.api_key
        }

        # Make the request
        response = requests.get(self.endpoint, params=params)
        data = response.json()
        distance = data['routes'][0]['legs'][0]['distance']['value'] / 1000 #kms of the trip

        return distance

    def calc_emissions(self, o_lat: float, o_long: float, d_lat: float, d_long: float, mode: str):
        """
        o_lat: Lattitude of the origin
        o_long: Longitude of the origin
        d_lat: Lattitde of the destination
        d_long: Longitude of the destination
        mode: The mode of transportation in values 'driving', 'walking', 'bicycling', or 'transit'
        """
        origin = f'{o_lat}, {o_long}'
        destination = f'{d_lat}, {d_long}'
        distance = self.get_dist_metric(origin, destination, mode)
        return distance * self.ems_consts[mode]

        
