import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./favorites.css";

const Favorites = ({
  favorites,
  onSelectFavorite,
  onToggleFavorite,
  onReorderFavorites,
}) => {
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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(favorites);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    onReorderFavorites(newItems);
  };

  return (
    <div className="favorites">
      <h2>즐겨찾기 목록</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favorites">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {favorites.map((city, index) => (
                <Draggable key={city} draggableId={city} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Favorites;
