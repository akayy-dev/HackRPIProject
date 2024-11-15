from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from os import getenv
from places import PlacesClient
from gpt import OpenAIClient
from emissions import EmissionsCalculator

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
openai = OpenAIClient(getenv("OPENAI_KEY"), getenv("ASST_KEY"))
em_calc = EmissionsCalculator(getenv("GOOG_KEY"))


@app.get('/get_nearby')
def get_nearby(lat: float, long: float):
	"""Take a pair of cooridnates and get a list of nearby locations"""
	return places.convert_coords(lat, long, ["park"])

@app.get('/get_place_info')
def get_place_info(name: str):
	"""Get a summary of a place by searching wikipedia for it, if the page doesn't exist, return none."""
	page_content = places.get_summary(name)
	if page_content is None:
		return None
	if page_content.get("content"):
		return openai.get_summary(page_content.get("content"))
	
@app.post('/get_trip_emissions')
def get_trip_emisions(o_lat: float, o_long: float, d_lat: float, d_long: float, mode: str):
	return em_calc.calc_emissions(o_lat, o_long, d_lat, d_long, mode)

if __name__ == '__main__':
	uvicorn.run("main:app", port=8080, reload=True)