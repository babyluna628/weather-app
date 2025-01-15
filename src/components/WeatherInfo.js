import React, { useState, useEffect } from "react";
import "./weatherInfo.css";

const WeatherInfo = ({ data, isFavorite, onToggleFavorite }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!data) return null;

  const cityTimezoneOffset = data.timezone;
  const formatLocalTime = (timestamp) => {
    const date = new Date((timestamp + cityTimezoneOffset) * 1000);
    const options = {
      timeZone: "UTC",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-US", options);
  };

  const weatherIconCode = data.weather[0].icon;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

  return (
    <div className="weather-info">
      <p style={{ textAlign: "center" }} className="time">
        {formatLocalTime(Math.floor(currentTime / 1000))}
      </p>
      <div className="weather-header">
        <h2 className="city-name">
          {data.name}, {data.sys.country}
          <button
            className={`favorite-star ${isFavorite ? "favorite" : ""}`}
            onClick={() => onToggleFavorite(data.name)}
          >
            ★
          </button>
        </h2>
      </div>

      <div className="temperature-section">
        <img
          src={weatherIconUrl}
          alt={data.weather[0].description}
          className="weather-icon"
        />
        <p>
          현재 온도: {Math.round(data.main.temp)}
          °C&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;체감 온도:{" "}
          {Math.round(data.main.feels_like)}°C
        </p>
        <br />
        <p>
          최저 기온: {Math.round(data.main.temp_min)}
          °C&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;최고 기온:{" "}
          {Math.round(data.main.temp_max)}
          °C
        </p>
      </div>
      <div className="weather-details">
        <p>구름: {data.clouds.all}%</p>
        <p>날씨: {data.weather[0].description}</p>
        <p>기압: {data.main.pressure} hpa</p>
        <p>습도: {data.main.humidity}%</p>
        <p>풍속: {data.wind.speed} m/s</p>
      </div>
      <div className="sun-times">
        <p>
          일출🌞: {formatLocalTime(data.sys.sunrise)}{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp; 일몰🌚:{" "}
          {formatLocalTime(data.sys.sunset)}
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;
