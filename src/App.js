import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherSearch from "./components/WeatherSearch";
import WeatherInfo from "./components/WeatherInfo";
import WeatherForecast from "./components/WeatherForecast";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("Seoul"); // 도시 이름 상태 추가

  const fetchWeatherData = async (city) => {
    try {
      setCityName(city); // 도시 이름 업데이트
      const currentResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=kr&units=metric`
      );

      setWeatherData(currentResponse.data);
      setError(null);

      // Fetching the 5-day/3-hour forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=kr&units=metric`
      );

      setForecastData(forecastResponse.data);
    } catch (err) {
      setError("날씨 정보를 가져오는데 실패했습니다.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData(cityName); // 초기 로딩 시 서울 날씨 표시
  }, []);

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <WeatherSearch onSearch={fetchWeatherData} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ flex: "1", marginRight: "20px" }}>
          {error && <p style={{ textAlign: "center" }}>{error}</p>}
          <WeatherInfo data={weatherData} />
        </div>
        <div style={{ flex: "1" }}>
          <WeatherForecast data={forecastData} cityName={cityName} />{" "}
          {/* 도시 이름 전달 */}
        </div>
      </div>
    </div>
  );
}

export default App;
