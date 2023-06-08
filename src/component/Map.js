import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export const Map = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    //fetching user's geolocation coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  return (
    <div id="map">
      {location ? (
        <MapContainer center={location} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location && (
            <Marker
              position={location}
              icon={L.icon({
                iconUrl: "icon-location.svg",
                iconSize: [25, 30],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })}
            >
              <Popup>Your location</Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};
