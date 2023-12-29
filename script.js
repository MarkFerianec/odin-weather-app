async function fetchForecastFromWeatherAPI(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7c8af27164954524aab224342232312&q=${location}&days=3`,
    { mode: 'cors' }
  );
  const weatherData = await response.json();
  console.log(weatherData);
}

fetchForecastFromWeatherAPI('London');
