import React, { useState, useEffect, useRef, useCallback } from "react";
import "./weatherSearch.css";

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = useCallback(() => {
    const addressObject = autocompleteRef.current.getPlace();
    const address = addressObject.address_components;

    if (address) {
      setCity(addressObject.name);
      onSearch(addressObject.name);
    }
  }, [onSearch]);

  const initAutocomplete = useCallback(() => {
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      document.getElementById("city-input"),
      { types: ["(cities)"] }
    );

    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);
  }, [handlePlaceSelect]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=en`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = initAutocomplete;
    return () => {
      document.body.removeChild(script);
    };
  }, [initAutocomplete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      alert("도시를 입력해주세요.");
      return;
    }
    onSearch(city);
  };

  return (
    <div>
      <h1 className="weather-title">Global Weather</h1>
      <div className="weather-search">
        <form onSubmit={handleSubmit}>
          <input
            id="city-input"
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
