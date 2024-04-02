import React, { useState, useEffect } from "react";
import CatchIpAddress from "../components/CatchIpAddress";
import GoogleMapsLocation from "../components/GoogleMapsLocation";
import WeatherInfo from "../components/WeatherInfo";
import axios from "axios";
import { apiKeyWeather,apiKeyPlace, apiKeyIp} from "../firebase/ApiKey";

function HomePage() {
  const [geoInfo, setGeoInfo] = useState({});
  const [weatherLocation, setWeatherLocation] = useState(null);

  const handleGeoInfoChange = async (newGeoInfo) => {
    setGeoInfo(newGeoInfo);
    if (newGeoInfo.latitude && newGeoInfo.longitude) {
      const weatherResponse = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKeyWeather}&q=${newGeoInfo.latitude},${newGeoInfo.longitude}`
      );
      setWeatherLocation({
        lat: newGeoInfo.latitude,
        lon: newGeoInfo.longitude,
        city: newGeoInfo.city,
        weatherData: weatherResponse.data
      });
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${geoInfo.city}&key=${apiKeyPlace}`
      );
      const { lat, lng } = response.data.results[0].geometry;
      const ipResponse = await axios.get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKeyIp}&position=${lat},${lng}`
      );
      setGeoInfo(ipResponse.data);
    } catch (error) {
      console.log("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (geoInfo.latitude && geoInfo.longitude) {
      setWeatherLocation({ lat: geoInfo.latitude, lon: geoInfo.longitude });
    }
  }, [geoInfo]);

  return (
    <div className="HomePage">
      <div className="ip_address">
        <CatchIpAddress onGeoInfoChange={handleGeoInfoChange} handleSearch={handleSearch} />
      </div>
      <div className="googleLocation">
        <GoogleMapsLocation geoInfo={geoInfo} />
      </div>
      <div className="weather">
        {weatherLocation && (
          <WeatherInfo location={weatherLocation} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
