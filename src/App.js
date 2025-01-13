import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherSearch from "./components/WeatherSearch";
import WeatherInfo from "./components/WeatherInfo";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=kr&units=metric`
      );

      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("날씨 정보를 가져오는데 실패했습니다.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData("Seoul"); // 초기 로딩 시 서울 날씨 표시
  }, []);

  return (
    <div className="App">
      <WeatherSearch onSearch={fetchWeatherData} />
      <br />
      <br />
      {error && <p style={{ textAlign: "center" }}>{error}</p>}
      <WeatherInfo data={weatherData} />
    </div>
  );
}

export default App;
