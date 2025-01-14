import React, { useState } from "react";
import "./weatherSearch.css";

const WeatherSearch = ({ onSearch, onToggleFavorite, isFavorite }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      alert("도시를 입력해주세요.");
      return;
    }
    onSearch(city);
    setCity("");
  };

  return (
    <div>
      <h1 className="weather-title">Global Weather</h1>
      <div className="weather-search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="도시 이름 입력 (예: Seoul)"
            className="search-input"
          />
          <button type="submit" className="search-button">
            검색
          </button>
        </form>
        <button
          onClick={() => onToggleFavorite(city)}
          className="favorite-button"
        >
          {isFavorite ? "즐겨찾기 제거" : "즐겨찾기 추가"}
        </button>
      </div>
    </div>
  );
};

export default WeatherSearch;
