const weather = document.querySelector(".js-weather"),
  iconSector = document.querySelector(".js-icon"),
  nowLocation = document.querySelector(".js-location");

const API_KEY = "09ae6f7c5fe83ae632ec3b157230d477";
const COORDS = "coords";
const ICON_URL = "http://openweathermap.org/img/w/";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const place = json.name;
      const weatherInfo = json.weather[0].main;
      const iconNum = json.weather[0].icon;
      const icon = ICON_URL + iconNum + ".png";

      nowLocation.innerHTML = `${temp}℃ @ ${place}`;
      weather.innerHTML = `${weatherInfo}`;
      iconSector.setAttribute("src", icon);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
