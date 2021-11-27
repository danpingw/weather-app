//Week
function currentTime(timestamp) {
  let date = timestamp.time;
  let mon = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let weekTable = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let week = weekTable[date.getDay() - 1];
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${hour}:${min}`;
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${mon}/${day} ${week}`;
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

function citysearch(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ea2c6cd1a422fcb7c4470a57622b5494`;
  axios.get(url).then(weather);
}

function timesearch(city) {
  let url = `https://www.amdoren.com/api/timezone.php?api_key=4usyrJsANArBCz3xXtPS7PHvcJ364N&loc=${city}`;
  axios.get(url).then(currentTime);
}

function currentCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  citysearch(city);
  timesearch(city);
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
  currentTemp.innerHTML = `${tempElement}`;
  let curCity = document.querySelector("#current-city");
  curCity.innerHTML = `${city}`;
}

function handlePosition(position) {
  let lat = Math.floor(position.coords.latitude);
  let lon = Math.floor(position.coords.longitude);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ea2c6cd1a422fcb7c4470a57622b5494`;
  axios.get(url).then(weatherCurrent);
}

function getCurrentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let TempCurrentClick = document.querySelector("#search-current-city");
TempCurrentClick.addEventListener("click", getCurrentTemp);

search("Tokyo");
