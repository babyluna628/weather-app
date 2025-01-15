import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./weathermap.css";

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

const WeatherMap = ({ lat, lon }) => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const [mapCenter, setMapCenter] = useState([lat, lon]);

  useEffect(() => {
    if (lat && lon) {
      setMapCenter([lat, lon]);
    }
  }, [lat, lon]);

  if (!lat || !lon) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={10}
      style={{ height: "400px", width: "100%" }}
    >
      <MapController center={mapCenter} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LayersControl position="topright">
        <LayersControl.Overlay name="Temperature">
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Clouds">
          <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Precipitation">
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
          />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default WeatherMap;
