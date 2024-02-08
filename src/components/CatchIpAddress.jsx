import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function CatchIpAddress({ onGeoInfoChange }) {
  const [ipAddress, setIpAddress] = useState("");
  const [geoInfo, setGeoInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVisitorIp(); 
  }, []);

  useEffect(() => {
    fetchIPInfo(); 
  }, [ipAddress, onGeoInfoChange]);

  const fetchIPInfo = async () => {
    try {
      const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
      const data = await response.json();

      setGeoInfo(data);
      setIsLoading(false);
      onGeoInfoChange(data);
    } catch (error) {
      console.log("Failed to fetch IP:", error);
    }
  };

  const getVisitorIp = async () => {
    try {
      const response = await fetch(`https://api.ipify.org`);
      const data = await response.text();

      setIpAddress(data);
    } catch (error) {
      console.log("Failed to fetch IP:", error);
    }
  };

  const handleInputChange = (e) => {
    setIpAddress(e.target.value);
  };

  return (
    <div className="CatchIpAddress">
      <h3>Ip to location</h3>
      {isLoading ? (
        <div className="spinner-container">
          <ClipLoader color={"aqua"} loading={isLoading} size={35} />
        </div>
      ) : (
        <div className="form-area">
          <input type="text" value={ipAddress} onChange={handleInputChange} />
        </div>
      )}

      {geoInfo.country && (
        <div>
          <strong>Country:</strong>
          {geoInfo.country} <br />
          <strong>City:</strong>
          {geoInfo.city} <br />
          <strong>Latitude:</strong>
          {geoInfo.lat} <br />
          <strong>Longitude:</strong>
          {geoInfo.lon} <br />
        </div>
      )}
    </div>
  );
}

export default CatchIpAddress;
