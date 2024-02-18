import React, { useState, useEffect } from 'react';
import { apiKeyWeather } from '../firebase/ApiKey';

const WeatherInfo = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = apiKeyWeather;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather data
        const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.lat},${location.lon}`);
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        // Fetch air quality data
        const airQualityResponse = await fetch(`https://api.weatherapi.com/v1/forecastday.json?key=${API_KEY}&q=${location.lat},${location.lon}`);
        const airQualityData = await airQualityResponse.json();
        setAirQuality(airQualityData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  return (
    <div>
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        weatherData && airQuality && (
          <div>
            <h2>Weather for {weatherData.location.name}</h2>
            <h3>Region {weatherData.location.country}</h3>
            <h4>Sat i datum {weatherData.location.localtime}</h4>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Temperature feels Like: {weatherData.current.feelslike_c}°C</p>
            <p>Vjetar {weatherData.current.wind_kph}</p>

            <p>Condition: {weatherData.current.condition.text}</p>
            <img src={weatherData.current.condition.icon} alt="Weather icon" />

            <h2>Air Quality</h2>
            <p>Insert air quality data here...</p>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherInfo;
