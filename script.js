//Function 1
let dateNow = document.querySelector("#current-time");

let today = new Date();
let dayN = today.getDate();

let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[today.getDay()];

let currentDate = `${day} ${dayN}, ${hours}:${minutes}`;
dateNow.innerHTML = currentDate;

//Function 2 + Current Main Weather

function searchNow(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-input");
  let headingCity = document.querySelector("#main-loc");
  let apiKey = "72dc5df4c3f125c3cc1a3df3d0aec808";
  let city = searchCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  headingCity.innerHTML = `${city}`;
  axios.get(apiUrl).then(showMainTemp);
}

function showMainTemp(response) {
  let tempElement = document.querySelector("#temp-now");
  let temperature = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${temperature}°C`;
}

let searchF = document.querySelector("#search-form");
searchF.addEventListener("submit", searchNow);

//bonus Week 04
function changeTemperatureF(event) {
  event.preventDefault();
  let tempC = document.querySelector("#temp-now");
  let subtempC = document.querySelector("#sub-temp");
  tempC.innerHTML = "95˚F";
  subtempC.innerHTML = "100˚F/73˚F";
}

function changeTemperatureC(event) {
  event.preventDefault();
  let tempF = document.querySelector("#temp-now");
  let subtempF = document.querySelector("#sub-temp");
  tempF.innerHTML = "35˚C";
  subtempF.innerHTML = "38˚C/23˚C";
}

let farenheit = document.querySelector("#faren");
farenheit.addEventListener("click", changeTemperatureF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeTemperatureC);

//Bonus Week 05

function showTemp(response) {
  let maintemp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp-now");
  let currentLoc = document.querySelector("#main-loc");
  tempNow.innerHTML = `${maintemp}°C`;
  currentLoc.innerHTML = `${response.data.name}`;
}

function showLL(position) {
  let cLat = position.coords.latitude;
  let cLong = position.coords.longitude;
  let apiKey = "72dc5df4c3f125c3cc1a3df3d0aec808";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cLat}&lon=${cLong}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLL);
}

let buttonCL = document.querySelector("#button-currentLoc");
buttonCL.addEventListener("click", getCurrentPosition);
