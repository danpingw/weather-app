//Tine
function currentTime(response) {
  let currentTime = document.querySelector("#current-time");
  let currentDate = document.querySelector("#current-date");
  currentTime.innerHTML = response.data.time_24;
  currentDate.innerHTML = response.data.date;
}

//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function weather(response) {
  let tempElement = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  let curCity = document.querySelector("#current-city");
  let icon = document.querySelector("#icon");
  currentTemp.innerHTML = `${tempElement}`;
  curCity.innerHTML = response.data.name;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//API-Weather
function search(city) {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ea2c6cd1a422fcb7c4470a57622b5494`;
  let timeUrl = `https://api.ipgeolocation.io/timezone?apiKey=eab6b55bcbac4289809e85eae59f3b15&location=${city}`;
  axios.get(weatherUrl).then(weather);
  axios.get(timeUrl).then(currentTime);
}

function currentCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  search(city);
}

let click = document.querySelector("#search-form");
click.addEventListener("submit", currentCity);

//tempC to tempF
function tempC(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  let temp = tempElement.innerHTML;
  tempElement.innerHTML = Math.round((temp * 9) / 5 + 32);
}

let TempCClick = document.querySelector("#current-f");
TempCClick.addEventListener("click", tempC);

function tempF(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  let temp = tempElement.innerHTML;
  tempElement.innerHTML = Math.round(((temp - 32) * 5) / 9);
}

let TempFClick = document.querySelector("#current-c");
TempFClick.addEventListener("click", tempF);

//Get the current location
function weatherCurrent(response) {
  let tempElement = Math.round(response.data.main.temp);
  let city = response.data.name;
  let currentTemp = document.querySelector("#current-temp");
  let curCity = document.querySelector("#current-city");
  currentTemp.innerHTML = `${tempElement}`;
  curCity.innerHTML = `${city}`;
}

function timeCurrent(response) {
  let currentTime = document.querySelector("#current-time");
  let currentDate = document.querySelector("#current-date");
  currentTime.innerHTML = response.data.time_24;
  currentDate.innerHTML = response.data.date;
}

function handlePosition(position) {
  let lat = Math.floor(position.coords.latitude);
  let lon = Math.floor(position.coords.longitude);
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ea2c6cd1a422fcb7c4470a57622b5494`;
  let timeUrl = `https://api.ipgeolocation.io/timezone?apiKey=eab6b55bcbac4289809e85eae59f3b15&lat=${lat}&long=${lon}`;
  axios.get(weatherUrl).then(weatherCurrent);
  axios.get(timeUrl).then(timeCurrent);
}

function getCurrentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let TempCurrentClick = document.querySelector("#search-current-city");
TempCurrentClick.addEventListener("click", getCurrentTemp);

search("Beijing");
