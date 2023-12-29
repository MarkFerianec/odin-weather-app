let weatherData = undefined;

async function fetchForecastFromWeatherAPI(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7c8af27164954524aab224342232312&q=${location}&days=3`,
    { mode: 'cors' }
  );
  weatherData = await response.json();
  console.log(weatherData);
  //   return weatherData;
}

// fetchForecastFromWeatherAPI('London');

function returnCurrentTemperature() {
  //   weatherData = await fetchForecastFromWeatherAPI('London');
  console.log(weatherData.current.temp_c);
  console.log(weatherData.current.temp_f);
}

function returnForecastTemperatures() {
  console.log(weatherData.forecast.forecastday[0].day.maxtemp_c);
  console.log(weatherData.forecast.forecastday[0].day.mintemp_c);
  console.log(weatherData.forecast.forecastday[0].day.maxtemp_f);
  console.log(weatherData.forecast.forecastday[0].day.mintemp_f);

  //   console.log(weatherData.forecast.forecastday[1].day.maxtemp_c);
  //   console.log(weatherData.forecast.forecastday[1].day.mintemp_c);
  //   console.log(weatherData.forecast.forecastday[1].day.maxtemp_f);
  //   console.log(weatherData.forecast.forecastday[1].day.mintemp_f);

  //   console.log(weatherData.forecast.forecastday[2].day.maxtemp_c);
  //   console.log(weatherData.forecast.forecastday[2].day.mintemp_c);
  //   console.log(weatherData.forecast.forecastday[2].day.maxtemp_f);
  //   console.log(weatherData.forecast.forecastday[2].day.mintemp_f);
}

// function returnThreeDayForecastTemperatures() {}

function logTemperatures() {
  returnCurrentTemperature();
  returnForecastTemperatures();
}

function fetchForecastFromWeatherAPIAndLogTemperatures() {
  fetchForecastFromWeatherAPI('London').then(function () {
    logTemperatures();
  });
}

fetchForecastFromWeatherAPIAndLogTemperatures();

// processForecastAndReturnCurrentTemp();

// fetchForecastFromWeatherAPI().then(processForecastAndReturnCurrentTemp());
