import React from "react";

const HourlyForecast = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div>
      <h2>시간별 예보</h2>
      <div style={{ display: "flex", overflowX: "auto" }}>
        {data.map((hour, index) => (
          <div key={index} style={{ margin: "0 10px" }}>
            <p>
              {new Date(hour.dt * 1000).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>{Math.round(hour.temp)}°C</p>
            <p>{hour.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
