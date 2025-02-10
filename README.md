Based on the provided links and available information, here's a comprehensive `README.md` for your GitHub repository:

---

# WeatherMapEN

[Live Demo](https://wheathermap.web.app/)

## Overview

WeatherMapEN is a responsive web application that provides users with real-time weather information for various locations worldwide. Built using React, the app integrates data from multiple APIs to deliver accurate weather forecasts and geolocation services.

## Features

- **Real-Time Weather Data**: Fetches current weather conditions and forecasts for user-specified locations.
- **Geolocation**: Automatically detects and displays weather information for the user's current location.
- **Responsive Design**: Ensures optimal viewing experience across a range of devices, from desktops to mobile phones.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **WeatherAPI**: Provides weather data including current conditions and forecasts.
- **AbstractAPI**: Offers IP geolocation services to determine the user's location.
- **Google Maps API**: Displays maps and location information.
- **Firebase Hosting**: Hosts the application for live access.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AlenZguric/weathermapen.git
   cd weathermapen
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your API keys:
     ```
     REACT_APP_WEATHER_API_KEY=your_weatherapi_key
     REACT_APP_ABSTRACT_API_KEY=your_abstractapi_key
     REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     ```

4. **Start the Application**:
   ```bash
   npm start
   ```
   The app will run locally at `http://localhost:3000`.

## Usage

- **Search for a Location**: Enter the name of a city or town in the search bar to retrieve its current weather and forecast.
- **Current Location Weather**: Allow the application to access your location to view weather information for your area.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your proposed changes.

## License

This project is licensed under the MIT License.

