export default function WeatherDisplay({ weather }) {
  if (!weather) return null;

  return (
    <div className="chart-container">
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.temp}°C</p>
      <p>Condition: {weather.condition}</p>
    </div>
  );
}