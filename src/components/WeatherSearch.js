import React, { useState } from "react";
import "./weatherSearch.css";

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
      </div>
    </div>
  );
};

export default WeatherSearch;
