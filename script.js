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

const submitButtonSelector = document.querySelector('#submit');
const locationTextSelector = document.querySelector('#location');

submitButtonSelector.addEventListener('click', submitLocationToWeatherAPI);

function submitLocationToWeatherAPI() {
  event.preventDefault();

  clearCity();

  fetchForecastFromWeatherAPI(locationTextSelector.value).then(function () {
    currentInfoDisplay();
  });

  locationTextSelector.value = '';
}

function clearCity() {
  currentDivSelector = document.querySelector('.current');
  currentCitySelector = document.querySelector('.city');
  currentDivSelector.removeChild(currentCitySelector);
}

function currentInfoDisplay() {
  currentDivSelector = document.querySelector('.current');

  const city = document.createElement('div');
  city.classList.add('city');
  currentDivSelector.appendChild(city);

  const cityName = document.createElement('div');
  city.appendChild(cityName);
  cityName.textContent = `${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`;

  const cityTime = document.createElement('div');
  city.appendChild(cityTime);
  cityTime.textContent = weatherData.location.localtime;

  const cityTemperature = document.createElement('div');
  city.appendChild(cityTemperature);
  cityTemperature.textContent = `${weatherData.current.temp_c} Celsius`;
}

function defaultAPIFetchAndDisplay() {
  fetchForecastFromWeatherAPI('Calgary').then(function () {
    currentInfoDisplay();
  });
}

defaultAPIFetchAndDisplay();

// fetchForecastFromWeatherAPIAndLogTemperatures(); //commented out temporarily.
