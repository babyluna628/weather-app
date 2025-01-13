import React from "react";

const WeatherInfo = ({ data }) => {
  if (!data) return null;

  return (
    console.log(data),
    (
      <div>
        <h2>
          {data.name}, {data.sys.country}
        </h2>
        <p>
          현재 온도: {Math.round(data.main.temp)}°C / 최저 기온:{" "}
          {Math.round(data.main.temp_min)}°C / 최고 기온:{" "}
          {Math.round(data.main.temp_max)}°C
        </p>
        <p>체감 온도: {Math.round(data.main.feels_like)}°C</p>
        <p>구름: {data.clouds.all}%</p>

        <p>날씨: {data.weather[0].description}</p>
        <p>기압: {data.main.pressure}</p>
        <p>습도: {data.main.humidity}%</p>
        <p>풍속: {data.wind.speed} m/s</p>
      </div>
    )
  );
};

export default WeatherInfo;
