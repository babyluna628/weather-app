import React, { useEffect, useState } from "react";
import "./weatherInfo.css";

const WeatherInfo = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!data) return null;

  return (
    <div className="weather-info">
      <h2 className="city-name">
        {data.name}, {data.sys.country}
      </h2>
      <div className="temperature-section">
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
          일출: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()} / 일몰:{" "}
          {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
        </p>
        <p>현재시간: {currentTime.toLocaleTimeString()} (한국 기준)</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
