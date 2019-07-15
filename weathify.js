let place = document.querySelector("#weather-city");
let timestamp = document.querySelector("#timestamp");
let description = document.querySelector("#weather-description");
let temperature = document.querySelector("#weather-temperature");
let humidity = document.querySelector("#weather-humidity");
let wind = document.querySelector("#weather-windspeed");
let timeNow = document.querySelector("#time-now");
let precipitation = document.querySelector("#weather-precipitation");

place.innerHTML = "Lisbon";
timestamp.innerHTML = "Thursday, 7:00 PM";

function formatDate(date) {
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
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

// function handleResponse(response) {
//   console.log(response.data);
//   let temperature = Math.round(response.data.main.temp);
//   console.log(temperature);
//   let weatherTemperature = document.querySelector("#weather-temperature");
//   weatherTemperature.innerHTML = `${Math.round(temperature)}`;
//   humidity.innerHTML = response.data.main.humidity;
//   windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
// }

// axios.get(`${apiUrl}/${apiPath}?${apiParams}`).then(handleResponse);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let apiRoot = "https://api.openweathermap.org/data/2.5";

  let apiKey = "020587e6f2a6601e01854941fcf9435b";
  axios
    .get(`${apiRoot}/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(function(response) {
      place.innerHTML = response.data.name;
      temperature.innerHTML = Math.round(response.data.main.temp);
      wind.innerHTML = Math.round(response.data.wind.speed);
      humidity.innerHTML = Math.round(response.data.main.humidity);
      slogan.innerHTML = formatSlogan();
    });
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

let slogan = document.querySelector("#slogan");

function formatSlogan() {
  console.log(temperature.innerHTML);
  if (temperature.innerHTML < 29) {
    return "You're set for some beach vacay.";
  } else if (temperature.innerHTML > 29) {
    return "NOT SO HOT";
  } else {
    return "PAULO";
  }
}

//You're set for some beach vacay
//Pack your warmest clothes
