// Fetch weather data from OpenWeather API
export async function fetchWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=283cb2178b2e7b75089b6ee7babb6cba&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return await response.json();
}