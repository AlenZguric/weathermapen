import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { apiKeyIp } from "../firebase/ApiKey";

function CatchIpAddress({ onGeoInfoChange }) {
  const [ipAddress, setIpAddress] = useState("");
  const [geoInfo, setGeoInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = apiKeyIp;

  useEffect(() => {
    getVisitorIp(); 
  }, []);

  useEffect(() => {
    if (ipAddress !== "") {
      fetchIPInfo();
    }
  }, [ipAddress]);

  const fetchIPInfo = async () => {
    try {
      setIsLoading(true); // Postavljamo isLoading na true prije nego što počnemo s pozivom API-ja

      const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}&ip_address=${ipAddress}`);
      const data = await response.json();

      setGeoInfo(data);
      setIsLoading(false);
      onGeoInfoChange(data);
    } catch (error) {
      console.log("Failed to fetch IP:", error);
      setIsLoading(false); // U slučaju greške, postavljamo isLoading na false kako bismo zaustavili spinner
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
          {geoInfo.latitude} <br />
          <strong>Longitude:</strong>
          {geoInfo.longitude} <br />
        </div>
      )}
    </div>
  );
}

export default CatchIpAddress;
