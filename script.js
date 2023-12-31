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

  clearLocationAndForecasts();

  fetchForecastFromWeatherAPI(locationTextSelector.value).then(function () {
    currentInfoDisplay();
    forecastDisplay();
  });

  locationTextSelector.value = '';
}

function clearLocationAndForecasts() {
  currentDivSelector = document.querySelector('.current');
  currentCitySelector = document.querySelector('.location');
  currentDivSelector.removeChild(currentCitySelector);

  forecastDivSelector = document.querySelector('.forecast');
  forecastsDivSelector = document.querySelector('.forecasts');
  forecastDivSelector.removeChild(forecastsDivSelector);
}

function currentInfoDisplay() {
  currentDivSelector = document.querySelector('.current');

  const location = document.createElement('div');
  location.classList.add('location');
  currentDivSelector.appendChild(location);

  const locationName = document.createElement('div');
  location.appendChild(locationName);
  locationName.textContent = `${weatherData.location.name}, ${weatherData.location.region}, ${weatherData.location.country}`;

  const locationCondition = document.createElement('div');
  location.appendChild(locationCondition);
  locationCondition.textContent = `${weatherData.current.condition.text}`;

  const locationTime = document.createElement('div');
  location.appendChild(locationTime);
  locationTime.textContent = weatherData.location.localtime;

  const locationTemperature = document.createElement('div');
  location.appendChild(locationTemperature);
  if (celsiusScale === true) {
    locationTemperature.textContent = `${weatherData.current.temp_c} °C`;
  } else {
    locationTemperature.textContent = `${weatherData.current.temp_f} °F`;
  }
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

  if (celsiusScale === true) {
    zeroElement.textContent = `${weatherData.forecast.forecastday[0].date} Max temp: ${weatherData.forecast.forecastday[0].day.maxtemp_c} °C Min temp: ${weatherData.forecast.forecastday[0].day.mintemp_c} °C`;
    firstElement.textContent = `${weatherData.forecast.forecastday[1].date} Max temp: ${weatherData.forecast.forecastday[1].day.maxtemp_c} °C Min temp: ${weatherData.forecast.forecastday[1].day.mintemp_c} °C`;
    secondElement.textContent = `${weatherData.forecast.forecastday[2].date} Max temp: ${weatherData.forecast.forecastday[2].day.maxtemp_c} °C Min temp: ${weatherData.forecast.forecastday[2].day.mintemp_c} °C`;
  } else {
    zeroElement.textContent = `${weatherData.forecast.forecastday[0].date} Max temp: ${weatherData.forecast.forecastday[0].day.maxtemp_f} °F Min temp: ${weatherData.forecast.forecastday[0].day.mintemp_f} °F`;
    firstElement.textContent = `${weatherData.forecast.forecastday[1].date} Max temp: ${weatherData.forecast.forecastday[1].day.maxtemp_f} °F Min temp: ${weatherData.forecast.forecastday[1].day.mintemp_f} °F`;
    secondElement.textContent = `${weatherData.forecast.forecastday[2].date} Max temp: ${weatherData.forecast.forecastday[2].day.maxtemp_f} °F Min temp: ${weatherData.forecast.forecastday[2].day.mintemp_f} °F`;
  }
}

function defaultAPIFetchAndDisplay() {
  fetchForecastFromWeatherAPI('Calgary').then(function () {
    currentInfoDisplay();
    forecastDisplay();
  });
}

defaultAPIFetchAndDisplay();

let celsiusScale = true;

function scaleChanger() {
  celsiusScale = !celsiusScale;
  // console.log(celsiusScale);
  clearLocationAndForecasts();
  currentInfoDisplay();
  forecastDisplay();
}

const scaleButtonSelector = document.querySelector('.scale');

scaleButtonSelector.addEventListener('click', scaleChanger);

// fetchForecastFromWeatherAPIAndLogTemperatures();
