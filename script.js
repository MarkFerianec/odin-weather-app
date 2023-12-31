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

  // clearCity();
  clearCityAndForecasts();

  fetchForecastFromWeatherAPI(locationTextSelector.value).then(function () {
    currentInfoDisplay();
    forecastDisplay();
  });

  locationTextSelector.value = '';
}

// function clearCity() {
//   currentDivSelector = document.querySelector('.current');
//   currentCitySelector = document.querySelector('.city');
//   currentDivSelector.removeChild(currentCitySelector);
// }

function clearCityAndForecasts() {
  currentDivSelector = document.querySelector('.current');
  currentCitySelector = document.querySelector('.city');
  currentDivSelector.removeChild(currentCitySelector);

  forecastDivSelector = document.querySelector('.forecast');
  forecastsDivSelector = document.querySelector('.forecasts');
  forecastDivSelector.removeChild(forecastsDivSelector);
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

function forecastDisplay() {
  forecastDivSelector = document.querySelector('.forecast');

  const forecastDiv = document.createElement('div');
  forecastDiv.classList.add('forecasts');
  forecastDivSelector.appendChild(forecastDiv);

  const zeroElement = document.createElement('div');
  const firstElement = document.createElement('div');
  const secondElement = document.createElement('div');

  forecastDiv.appendChild(zeroElement);
  forecastDiv.appendChild(firstElement);
  forecastDiv.appendChild(secondElement);

  zeroElement.textContent = `${weatherData.forecast.forecastday[0].date} Max temp: ${weatherData.forecast.forecastday[0].day.maxtemp_c} C Min temp: ${weatherData.forecast.forecastday[0].day.mintemp_c} C`;
  firstElement.textContent = `${weatherData.forecast.forecastday[1].date} Max temp: ${weatherData.forecast.forecastday[1].day.maxtemp_c} C Min temp: ${weatherData.forecast.forecastday[1].day.mintemp_c} C`;
  secondElement.textContent = `${weatherData.forecast.forecastday[2].date} Max temp: ${weatherData.forecast.forecastday[2].day.maxtemp_c} C Min temp: ${weatherData.forecast.forecastday[2].day.mintemp_c} C`;
}

// forecastDisplay();

function defaultAPIFetchAndDisplay() {
  fetchForecastFromWeatherAPI('Calgary').then(function () {
    currentInfoDisplay();
    forecastDisplay();
  });
}

defaultAPIFetchAndDisplay();

// fetchForecastFromWeatherAPIAndLogTemperatures(); //commented out temporarily.
