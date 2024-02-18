/*global google*/
import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { apiKey } from "../firebase/ApiKey.js";

function GoogleMapsLocation({ geoInfo }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (geoInfo && geoInfo.latitude && geoInfo.longitude) {
      const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
        libraries: ["places"],
      });

      loader.load().then(() => {
        const mapInstance = new google.maps.Map(document.getElementById("map"), {
          center: { lat: geoInfo.latitude, lng: geoInfo.longitude },
          zoom: 8,
        });

        const markerInstance = new google.maps.Marker({
          position: { lat: geoInfo.latitude, lng: geoInfo.longitude },
          map: mapInstance,
          title: "Location",
        });

        setMap(mapInstance);
        setMarker(markerInstance);
      });
    }
  }, [geoInfo]);

  return (
    <div className="GoogleMapsLocation">
      <h3>Google Maps Location</h3>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
}

export default GoogleMapsLocation;