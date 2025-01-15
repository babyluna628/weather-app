import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherSearch from "./components/WeatherSearch";
import WeatherInfo from "./components/WeatherInfo";
import WeatherForecast from "./components/WeatherForecast";
import Favorites from "./components/Favorites";
import "./App.css";
import WeatherMap from "./components/WeatherMap";
import "leaflet/dist/leaflet.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("Seoul");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

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
      const updatedFavorites = prevFavorites.includes(city)
        ? prevFavorites.filter((fav) => fav !== city)
        : [...prevFavorites, city];

      // 업데이트된 즐겨찾기를 localStorage에 저장
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };
  const onReorderFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };
  return (
    <div className="App">
      <div className="search-container">
        <WeatherSearch onSearch={fetchWeatherData} />
      </div>
      <div className="content-container">
        <div className="favorites-column">
          <Favorites
            favorites={favorites}
            onSelectFavorite={fetchWeatherData}
            onToggleFavorite={toggleFavorite}
            onReorderFavorites={onReorderFavorites}
          />
        </div>
        <div className="weather-info-column">
          {error && <p>{error}</p>}
          {weatherData && (
            <WeatherInfo
              data={weatherData}
              isFavorite={favorites.includes(weatherData.name)}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </div>
        <div className="weather-forecast-column">
          <WeatherForecast data={forecastData} cityName={cityName} />
        </div>
      </div>
      <br />
      <br />
      <div className="weather-map-column">
        {weatherData && weatherData.coord && (
          <WeatherMap lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
        )}
      </div>
    </div>
  );
}

export default App;
