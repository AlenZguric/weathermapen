import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { apiKeyIp, apiKeyPlace } from "../firebase/ApiKey";
import axios from "axios";

function CatchIpAddress({ onGeoInfoChange }) {
  const [ipAddress, setIpAddress] = useState(""); // Stanje za IP adresu
  const [geoInfo, setGeoInfo] = useState({}); // Stanje za informacije o lokaciji
  const [isLoading, setIsLoading] = useState(true); // Stanje za indikator učitavanja
  const [searchCity, setSearchCity] = useState(""); // Stanje za pretraženi grad

  useEffect(() => {
    // Dohvati trenutnu IP adresu prilikom prvog renderiranja
    getVisitorIp();
  }, []);

  useEffect(() => {
    // Ako je ipAddress postavljen, dohvati informacije o lokaciji
    if (ipAddress !== "") {
      fetchIPInfo();
    }
  }, [ipAddress]);

  const fetchIPInfo = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKeyIp}&ip_address=${ipAddress}`
      );

      setGeoInfo(response.data); // Postavi informacije o lokaciji
      setIsLoading(false);
      onGeoInfoChange(response.data);
    } catch (error) {
      console.log("Failed to fetch IP:", error);
      setIsLoading(false);
    }
  };

  const getVisitorIp = async () => {
    try {
      const response = await axios.get(`https://api.ipify.org`);

      setIpAddress(response.data); // Postavi trenutnu IP adresu
    } catch (error) {
      console.log("Failed to fetch IP:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchCity(e.target.value); // Postavi vrijednost pretraženog grada
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${searchCity}&key=${apiKeyPlace}`
      );

      const { lat, lng } = response.data.results[0].geometry;

      const ipResponse = await axios.get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKeyIp}&position=${lat},${lng}`
      );

      setIpAddress(ipResponse.data.ip_address); // Postavi novu IP adresu
      setGeoInfo(ipResponse.data); // Postavi nove informacije o lokaciji
      setIsLoading(false);
      onGeoInfoChange(ipResponse.data);
    } catch (error) {
      console.log("Failed to fetch data:", error);
      setIsLoading(false);
    }
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
          <input
            type="text"
            value={searchCity}
            onChange={handleInputChange}
            placeholder="Unesite ime grada..."
          />
          <button onClick={handleSearch}>Pretraži</button>
          <br />
          <p>{geoInfo.city}</p> {/* Prikazi naziv grada */}
          <p>{ipAddress}</p> {/* Prikazi IP adresu */}
        </div>
      )}

      {geoInfo.country && (
        <div>
          <strong>Država:</strong>
          {geoInfo.country} <br />
          <strong>Grad:</strong>
          {geoInfo.city} <br />
          <strong>Geografska širina:</strong>
          {geoInfo.latitude} <br />
          <strong>Geografska dužina:</strong>
          {geoInfo.longitude} <br />
        </div>
      )}
    </div>
  );
}

export default CatchIpAddress;
