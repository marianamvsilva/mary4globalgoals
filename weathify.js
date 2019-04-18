let place = document.querySelector("#weather-city");
let timestamp = document.querySelector("#timestamp");
let description = document.querySelector("#weather-description");
let temperature = document.querySelector("#weather-temperature");
let humidity = document.querySelector("#weather-humidity");
let windSpeed = document.querySelector("#weather-windspeed");
let timeNow = document.querySelector("#time-now");

place.innerHTML = "Lisbon";
timestamp.innerHTML = "Thursday, 7:00 PM";
description.innerHTML = "Sunny";
humidity.innerHTML = 19999;
windSpeed.innerHTML = 133;

function formatDate(date) {
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  let day = weekDays[date.getDay()];
  let month = monthNames[date.getMonth()];

  return `${day}, ${month} ${date.getDate()} ${date.getFullYear()}`;
}

let now = new Date();
let currentDate = document.querySelector("#timestamp");
currentDate.innerHTML = formatDate(now);

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
timeNow.innerHTML = formatTime(now);

let apiKey = "020587e6f2a6601e01854941fcf9435b";
let apiUrl = "https://api.openweathermap.org/data/2.5";
let apiPath = "weather";
let city = "Lisbon";
let apiParams = `q=${city}&appid=${apiKey}&units=metric`;

function handleResponse(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let weatherTemperature = document.querySelector("#weather-temperature");
  weatherTemperature.innerHTML = `${Math.round(temperature)}`;
}

axios.get(`${apiUrl}/${apiPath}?${apiParams}`).then(handleResponse);

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  alert(cityInput.value);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);
