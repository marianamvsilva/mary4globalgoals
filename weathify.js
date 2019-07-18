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

function friendlyDate(date) {
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

  return `${day}, ${month} ${date.getDate()}`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let apiRoot = "https://api.openweathermap.org/data/2.5";

  axios
    .get(`${apiRoot}/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(function(response) {
      place.innerHTML = response.data.name;
      temperature.innerHTML = Math.round(response.data.main.temp);
      wind.innerHTML = Math.round(response.data.wind.speed);
      humidity.innerHTML = Math.round(response.data.main.humidity);
      description.innerHTML = response.data.weather[0].main;
      slogan.innerHTML = formatSlogan();
    });

  axios
    .get(`${apiRoot}/forecast?q=${city}&units=metric&appid=${apiKey}`)
    .then(function(response) {
      document
        .querySelectorAll("#day__block")
        .forEach(function(element, index) {
          let day = new Date(response.data.list[1 + index * 8].dt_txt);
          element.querySelector("#day__block-date").innerHTML = friendlyDate(
            day
          );
          element.querySelector("#day__block-temp").innerHTML = Math.round(
            response.data.list[1 + index * 8].main.temp
          );

          element
            .querySelector("#day__block-icon")
            .setAttribute(
              "src",
              "http://openweathermap.org/img/w/" +
                response.data.list[1 + index * 8].weather[0].icon +
                ".png"
            );
        });
    });
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

let slogan = document.querySelector("#slogan");

function formatSlogan() {
  console.log(temperature.innerHTML);
  if (description.innerHTML == "Clouds" || description.innerHTML == "Rain") {
    return "Don't worry. You can still explore some coffee shops.";
  } else if (description.innerHTML == "Clear") {
    return "You're set for some beach vacay.";
  } else {
    return "Oops, it's not working.";
  }
}
