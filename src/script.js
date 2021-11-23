//⏰Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00
function currentTime(date) {
  let hour = date.getHours();
  let min = date.getMinutes();
  let mon = date.getMonth() + 1;
  let day = date.getDate();
  let weekTable = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let week = weekTable[date.getDay()];
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${hour}:${min}`;
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${mon}/${day} ${week}`;
}
let date = new Date();
currentTime(date);

//🕵️‍♀️Feature #2
//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function weather(response) {
  let tempElement = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${tempElement}`;
  let curCity = document.querySelector("#current-city");
  curCity.innerHTML = response.data.name;
}

function search(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ea2c6cd1a422fcb7c4470a57622b5494`;
  axios.get(url).then(weather);
}

function currentCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  search(city);
}

let click = document.querySelector("#search-form");
click.addEventListener("submit", currentCity);

//🙀Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

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
