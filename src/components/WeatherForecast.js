import React from "react";
import "./weatherForecast.css";

const WeatherForecast = ({ data, cityName }) => {
  if (!data) return null;

  return (
    <div className="weather-forecast">
      <h2>{cityName}의 5일 날씨 예보</h2> {/* 도시 이름 추가 */}
      {data.list.slice(0, 40).map((forecast, index) => (
        <div key={index} className="forecast-item">
          <p>{new Date(forecast.dt * 1000).toLocaleString()}</p>
          <p>온도: {Math.round(forecast.main.temp)}°C</p>
          <p>날씨: {forecast.weather[0].description}</p>
          {/* 날씨 아이콘 추가 */}
          <img
            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
            alt={forecast.weather[0].description}
            className="weather-icon"
          />
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
