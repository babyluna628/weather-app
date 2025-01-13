import React, { useState } from "react";

const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity(""); // 폼 제출 후 입력창 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="도시 이름 입력"
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default WeatherSearch;
