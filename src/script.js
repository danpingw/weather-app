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
  weatherForecast(response.data.coord);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return year + "/" + month + "/" + day;
}

function formatWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesda",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        ` <li class="list1">
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <p id="N1-date">${formatDate(forecastDay.dt)}</p>
        <p class="card-text2">${formatWeek(forecastDay.dt)}</p>
      </div>
      <div class="col-sm">
        <p class="card-text3">${Math.round(forecastDay.temp.day)}°C</p>
        <p class="card-text4">
        <img id=icon
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
    
      />
        </p>
      </div>
    </div>
  </div>
</li>
<br />
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function weatherForecast(data) {
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&appid=ea2c6cd1a422fcb7c4470a57622b5494&units=metric`;
  console.log(forecastUrl);
  axios.get(forecastUrl).then(displayForecast);
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
  TempCClick.classList.add("active");
  TempFClick.classList.remove("active");
}

//tempC to tempF

function tempC(event) {
  event.preventDefault();
  let celElement = document.querySelector("#current-temp");
  TempCClick.classList.add("active");
  TempFClick.classList.remove("active");
  let temp = tempElement;
  celElement.innerHTML = Math.round(temp);
}

function tempF(event) {
  event.preventDefault();
  let fahTemp = document.querySelector("#current-temp");
  TempCClick.classList.remove("active");
  TempFClick.classList.add("active");
  let temp = (tempElement * 9) / 5 + 32;
  fahTemp.innerHTML = Math.round(temp);
  console.log(tempElement);
}

//Get the current location
function handlePosition(position) {
  let lat = Math.floor(position.coords.latitude);
  let lon = Math.floor(position.coords.longitude);
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ea2c6cd1a422fcb7c4470a57622b5494`;
  let timeUrl = `https://api.ipgeolocation.io/timezone?apiKey=eab6b55bcbac4289809e85eae59f3b15&lat=${lat}&long=${lon}`;
  axios.get(weatherUrl).then(weather);
  axios.get(timeUrl).then(currentTime);
  axios.get(weatherUrl).then(displayForecast);
}

function getCurrentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
  TempCClick.classList.add("active");
  TempFClick.classList.remove("active");
}

let tempElement = null;

let click = document.querySelector("#search-form");
click.addEventListener("submit", currentCity);

let TempCurrentClick = document.querySelector("#search-current-city");
TempCurrentClick.addEventListener("click", getCurrentTemp);

let TempFClick = document.querySelector("#current-f");
TempFClick.addEventListener("click", tempF);

let TempCClick = document.querySelector("#current-c");
TempCClick.addEventListener("click", tempC);

search("Beijing");
