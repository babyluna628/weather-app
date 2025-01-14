import React from "react";
import "./favorites.css";

const Favorites = ({ favorites, onSelectFavorite, onToggleFavorite }) => {
  return (
    <div className="favorites">
      <h2>즐겨찾기 목록</h2>
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>
            <span onClick={() => onSelectFavorite(city)}>{city}</span>
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
