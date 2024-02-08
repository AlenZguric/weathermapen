import React, { useState } from "react";
import CatchIpAddress from "../components/CatchIpAddress";
import GoogleMapsLocation from "../components/GoogleMapsLocation";

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
      <div className="wheader"></div>
    </div>
  );
}

export default HomePage;
