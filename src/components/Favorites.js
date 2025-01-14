import React from "react";
import "./favorites.css";

const Favorites = ({ favorites, onSelectFavorite }) => {
  return (
    <div className="favorites">
      <h2>즐겨찾기</h2>
      <ul>
        {favorites.map((city, index) => (
          <li key={index} onClick={() => onSelectFavorite(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
