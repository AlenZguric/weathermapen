import React, { useState, useEffect } from "react";
import { apiKeyWeather } from "../firebase/ApiKey";
import axios from "axios";

const WeatherInfo = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = apiKeyWeather;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch weather data
        const weatherResponse = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.lat},${location.lon}`
        );
        setWeatherData(weatherResponse.data);

        console.log(weatherResponse);

        // Fetch air quality data
        const airQualityResponse = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.lat},${location.lon}&aqi=yes`
        );
        setAirQuality(airQualityResponse.data);

        console.log(airQualityResponse);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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
        weatherData &&
        airQuality && (
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
            <p>CO: {airQuality.current.air_quality.co} μg/m³</p>
            <p>O3: {airQuality.current.air_quality.o3} μg/m³</p>
            <p>NO2: {airQuality.current.air_quality.no2} μg/m³</p>
            <p>SO2: {airQuality.current.air_quality.so2} μg/m³</p>
            <p>PM2.5: {airQuality.current.air_quality.pm2_5} μg/m³</p>
            <p>PM10: {airQuality.current.air_quality.pm10} μg/m³</p>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherInfo;
