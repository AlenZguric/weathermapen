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
        const weatherResponse = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.lat},${location.lon}`
        );
        setWeatherData(weatherResponse.data);

        console.log(weatherResponse);

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

  const getAirQualityColor = (value, pollutant) => {
    if (pollutant === "O3") {
      if (value <= 100) return "green";
      else if (value <= 130) return "yellow";
      else if (value <= 200) return "orange";
      else return "red";
    } else if (pollutant === "NO2") {
      if (value <= 90) return "green";
      else if (value <= 120) return "yellow";
      else if (value <= 200) return "orange";
      else return "red";
    } else if (pollutant === "SO2") {
      if (value <= 200) return "green";
      else if (value <= 350) return "yellow";
      else if (value <= 400) return "orange";
      else return "red";
    } else if (pollutant === "PM2.5") {
      if (value <= 20) return "green";
      else if (value <= 30) return "yellow";
      else if (value <= 90) return "orange";
      else return "red";
    } else if (pollutant === "PM10") {
      if (value <= 35) return "green";
      else if (value <= 50) return "yellow";
      else if (value <= 90) return "orange";
      else return "red";
    }
  };

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
            <div className="air">
              <p>O3: {airQuality.current.air_quality.o3} μg/m³</p>
              <div
                className="color-box"
                style={{
                  backgroundColor: getAirQualityColor(
                    airQuality.current.air_quality.o3,
                    "O3"
                  ),
                  padding: "10px",
                }}
              ></div>
            </div>
            <div className="air">
              <p>NO2: {airQuality.current.air_quality.no2} μg/m³</p>
              <div
                className="color-box"
                style={{
                  backgroundColor: getAirQualityColor(
                    airQuality.current.air_quality.no2,
                    "NO2"
                  ),
                  padding: "10px",
                }}
              ></div>
            </div>
            <div className="air">
              <p>SO2: {airQuality.current.air_quality.so2} μg/m³</p>
              <div
                className="color-box"
                style={{
                  backgroundColor: getAirQualityColor(
                    airQuality.current.air_quality.so2,
                    "SO2"
                  ),
                  padding: "10px",
                }}
              ></div>
            </div>
            <div className="air">
              <p>PM2.5: {airQuality.current.air_quality.pm2_5} μg/m³</p>
              <div
                className="color-box"
                style={{
                  backgroundColor: getAirQualityColor(
                    airQuality.current.air_quality.pm2_5,
                    "PM2.5"
                  ),
                  padding: "10px",
                }}
              ></div>
            </div>
            <div className="air">
              <p>PM10: {airQuality.current.air_quality.pm10} μg/m³</p>
              <div
                className="color-box"
                style={{
                  backgroundColor: getAirQualityColor(
                    airQuality.current.air_quality.pm10,
                    "PM10"
                  ),
                  padding: "10px",
                }}
              ></div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WeatherInfo;
