import React, { useState } from "react";
import CatchIpAddress from "../components/CatchIpAddress";
import GoogleMapsLocation from "../components/GoogleMapsLocation";
import WeatherInfo from "../components/WeatherInfo";

function HomePage() {
  const [geoInfo, setGeoInfo] = useState({});

  const handleGeoInfoChange = (newGeoInfo) => {
    setGeoInfo(newGeoInfo);
  };

  return (
    <div className="HomePage">
      <div className="ip_address">
        <CatchIpAddress onGeoInfoChange={handleGeoInfoChange} />
      </div>
      <div className="googleLocation">
        <GoogleMapsLocation geoInfo={geoInfo} />
      </div>
      <div className="weather">
        {geoInfo && geoInfo.latitude && geoInfo.longitude && (
          <WeatherInfo location={{ lat: geoInfo.latitude, lon: geoInfo.longitude }} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
