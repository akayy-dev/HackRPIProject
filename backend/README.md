# Backend README

## Setup Instructions

### 1. Create and Activate Virtual Environment

To ensure all dependencies are managed properly, create and activate a virtual environment:

```sh
# Create a virtual environment
python -m venv venv

# Activate the virtual environment (Windows)
venv\Scripts\activate

# Activate the virtual environment (macOS/Linux)
source venv/bin/activate
```

### 2. Install Dependencies

With the virtual environment activated, install the required dependencies:

```sh
pip install -r requirements.txt
```

### 3. Set Environment Variables

The application requires certain environment variables to function correctly. Create a `.env` file in the `backend` directory and add the following:

```
PLACES_API_KEY=your_google_places_api_key
```

Replace `your_google_places_api_key` with your actual Google Places API key.

### 4. Run the Server

With the virtual environment activated and environment variables set, you can start the server:

```sh
uvicorn main:app --reload
```

or:

```sh
python3 backend/main.py
```

The server will start on `http://localhost:8080`.

### 5. API Endpoints

- **Get Nearby Places**: `/get_nearby?lat=<latitude>&long=<longitude>`
- **Get Place Info**: `/get_place_info?name=<place_name>`

### 6. Deactivate Virtual Environment

Once you are done, you can deactivate the virtual environment:

```sh
deactivate
```
