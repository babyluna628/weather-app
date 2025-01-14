import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherSearch from "./components/WeatherSearch";
import WeatherInfo from "./components/WeatherInfo";
import WeatherForecast from "./components/WeatherForecast";
import Favorites from "./components/Favorites";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("Seoul");
  const [favorites, setFavorites] = useState([]);

  const fetchWeatherData = async (city) => {
    try {
      setCityName(city);
      const currentResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=kr&units=metric`
      );

      setWeatherData(currentResponse.data);
      setError(null);

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
    fetchWeatherData(cityName);
  }, []);

  const toggleFavorite = (city) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(city)) {
        return prevFavorites.filter((fav) => fav !== city);
      } else {
        return [...prevFavorites, city];
      }
    });
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div style={{ width: "50%", marginBottom: "20px" }}>
        <WeatherSearch
          onSearch={fetchWeatherData}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(cityName)}
        />
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div style={{ width: "25%", paddingRight: "20px" }}>
          <Favorites
            favorites={favorites}
            onSelectFavorite={fetchWeatherData}
          />
        </div>
        <div style={{ width: "50%" }}>
          {error && <p style={{ textAlign: "center" }}>{error}</p>}
          <WeatherInfo data={weatherData} />
        </div>
        <div style={{ width: "25%", paddingLeft: "20px" }}>
          <WeatherForecast data={forecastData} cityName={cityName} />
        </div>
      </div>
    </div>
  );
}

export default App;
