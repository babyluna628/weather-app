import React, { useState, useEffect } from "react";
import axios from "axios";
import "./favorites.css";

const Favorites = ({ favorites, onSelectFavorite, onToggleFavorite }) => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const newWeatherData = {};

      for (const city of favorites) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          newWeatherData[city] = {
            temp: Math.round(response.data.main.temp),
            weather: response.data.weather[0].main,
            icon: response.data.weather[0].icon,
          };
        } catch (error) {
          console.error(`Error fetching weather for ${city}:`, error);
        }
      }

      setWeatherData(newWeatherData);
    };

    if (favorites.length > 0) {
      fetchWeatherData();
    }
  }, [favorites]);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <div className="favorites">
      <h2>즐겨찾기 목록</h2>
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>
            <span onClick={() => onSelectFavorite(city)}>
              {city}
              {weatherData[city] && (
                <span>
                  <img
                    src={getWeatherIcon(weatherData[city].icon)}
                    alt={weatherData[city].weather}
                    className="fweather-icon"
                  />
                  {weatherData[city].temp}°C
                </span>
              )}
            </span>
            <button
              className="favorite-toggle"
              onClick={() => onToggleFavorite(city)}
            >
              ★
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
