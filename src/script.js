//Time
function currentTime(response) {
  let currentTime = document.querySelector("#current-time");
  let currentDate = document.querySelector("#current-date");
  currentTime.innerHTML = response.data.time_24;
  currentDate.innerHTML = response.data.date;
}

//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function weather(response) {
  let currentTemp = document.querySelector("#current-temp");
  let curCity = document.querySelector("#current-city");
  let icon = document.querySelector("#icon");
  tempElement = response.data.main.temp;
  currentTemp.innerHTML = Math.round(tempElement);
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

//tempC to tempF
function tempF(event) {
  event.preventDefault();
  let fahTemp = document.querySelector("#current-temp");
  TempCClick.classList.remove("active");
  TempFClick.classList.add("active");
  let temp = (tempElement * 9) / 5 + 32;
  fahTemp.innerHTML = Math.round(temp);
  console.log(tempElement);
}

function tempC(event) {
  event.preventDefault();
  let celElement = document.querySelector("#current-temp");
  TempCClick.classList.add("active");
  TempFClick.classList.remove("active");
  let temp = tempElement;
  celElement.innerHTML = Math.round(temp);
}

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

let tempElement = null;

let click = document.querySelector("#search-form");
click.addEventListener("submit", currentCity);

let TempFClick = document.querySelector("#current-f");
TempFClick.addEventListener("click", tempF);

let TempCClick = document.querySelector("#current-c");
TempCClick.addEventListener("click", tempC);

let TempCurrentClick = document.querySelector("#search-current-city");
TempCurrentClick.addEventListener("click", getCurrentTemp);

search("Beijing");
