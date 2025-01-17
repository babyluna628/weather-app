import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./favorites.css";

const Favorites = ({
  favorites,
  onSelectFavorite,
  onToggleFavorite,
  onReorderFavorites,
  weatherData,
}) => {
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
      <div className="favorites-list">
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
    </div>
  );
};

export default Favorites;
