import React, { useState } from "react";
import CityInput from "./components/CityInput";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherChart from "./components/WeatherChart";
import Insight from "./components/Insight";

import { fetchWeather } from "./utils/fetchWeather";
import { processForecast } from "./utils/processForecast";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await fetchWeather(city);

      console.log(data);

      setWeather({
        name: data.city.name,
        temp: data.list[0].main.temp,
        condition: data.list[0].weather[0].main,
      });

      const processed = processForecast(data);
      setChartData(processed);

    } catch (err) {
      setError(err.message);
      setWeather(null);
      setChartData([]);
    }
  }

  return (
    <div className="app">
      <h1>Weather Trend Planner</h1>
      <p>Beware of the weather</p>

      <CityInput
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
      />

      {error && <p className="error">{error}</p>}

      <WeatherDisplay weather={weather} />
      <WeatherChart data={chartData} />
      <Insight data={chartData} />
    </div>
  );
}