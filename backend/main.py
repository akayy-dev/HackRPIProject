from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from os import getenv
from places import PlacesClient

app = FastAPI()

origins = ["*", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

places = PlacesClient(getenv("PLACES_API_KEY"))


@app.get('/get_nearby')
def get_nearby(lat: float, long: float):
	"""Take a pair of cooridnates and get a list of nearby locations"""
	return places.convert_coords(lat, long, ["park"])

@app.get('/get_place_info')
def get_place_info(name: str):
	"""Get a summary of a place by searching wikipedia for it, if the page doesn't exist, return none."""
	return places.get_summary(name)

if __name__ == '__main__':
	uvicorn.run("main:app", port=8080, reload=True)