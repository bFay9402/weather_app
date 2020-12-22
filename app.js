const api = {
  key: 'f54b5bb769652b1e2c24559a5a512ff2',
  url: 'https://api.openweathermap.org/data/2.5/'
}

const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('keypress', setQuery);

//functions
function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchBar.value);
  }
}

function getResults (query) {
  fetch(`${api.url}weather?zip=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}`;

  let today = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(today);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<sup><span>°F</span></sup>`;

  let weatherEl = document.querySelector('.current, .weather');
  weatherEl.innerText = weather.weather[0].main;

  let highLow = document.querySelector('.high-low');
  highLow.innerHTML = `High: ${weather.main.temp_min}<sup>°F</sup> / Low: ${weather.main.temp_max}<sup>°F</sup>`;
}

//makes date takes in d for date
function dateBuilder(d) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${month} ${date} ${year}`;
}