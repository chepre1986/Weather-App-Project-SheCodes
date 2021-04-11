// DATE AND TIME
let now = new Date();
let mainDate = document.querySelector("#main-date");
let mainWeekDay = document.querySelector("#main-weekday");
let weekDay1 = document.querySelector("#day-1");
let weekDay2 = document.querySelector("#day-2");
let weekDay3 = document.querySelector("#day-3");
let weekDay4 = document.querySelector("#day-4");
let weekDay5 = document.querySelector("#day-5");
let weekDay6 = document.querySelector("#day-6");
let year = now.getFullYear();
let month = now.getMonth();
let day = now.getDate();
let weekDay = now.getDay();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let days = [
  "0",
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
  "21st",
  "22nd",
  "23rd",
  "24th",
  "25th",
  "26th",
  "27th",
  "28th",
  "29th",
  "30th",
  "31st"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

mainDate.innerHTML = `${months[month]} ${days[day]}, ${year}`;
mainWeekDay.innerHTML = `${weekDays[weekDay].toUpperCase()}`;
weekDay1.innerHTML = `${weekDays[(weekDay + 1) % 7].toUpperCase()}`;
weekDay2.innerHTML = `${weekDays[(weekDay + 2) % 7].toUpperCase()}`;
weekDay3.innerHTML = `${weekDays[(weekDay + 3) % 7].toUpperCase()}`;
weekDay4.innerHTML = `${weekDays[(weekDay + 4) % 7].toUpperCase()}`;
weekDay5.innerHTML = `${weekDays[(weekDay + 5) % 7].toUpperCase()}`;
weekDay6.innerHTML = `${weekDays[(weekDay + 6) % 7].toUpperCase()}`;

let mainTime = document.querySelector("#main-time");
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
mainTime.innerHTML = `${hour}:${minutes}`;

//Celsjusz - Farenheit
function pressCel(event) {
  event.preventDefault();
  let buttonCel = document.querySelector("#celsjusz");
  buttonCel.classList.add("picked");
  let buttonFah = document.querySelector("#farenheit");
  buttonFah.classList.add("picked");
  buttonFah.classList.remove("picked");
}

function pressFah(event) {
  event.preventDefault();
  let buttonCel = document.querySelector("#celsjusz");
  buttonCel.classList.add("picked");
  buttonCel.classList.remove("picked");
  let buttonFah = document.querySelector("#farenheit");
  buttonFah.classList.add("picked");
}

let buttCel = document.querySelector("#celsjusz");
buttCel.addEventListener("click", pressCel);

let buttFah = document.querySelector("#farenheit");
buttFah.addEventListener("click", pressFah);

//City searching engine temperature
function displayWeather(response) {
  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  let maxTemp = document.querySelector("#main-temp-max");
  maxTemp.innerHTML = `${temperature}°C`;
  // let max1 = document.querySelector("#max1");
  // let max2 = document.querySelector("#max2");
  // let max3 = document.querySelector("#max3");
  // let max4 = document.querySelector("#max4");
  // let max5 = document.querySelector("#max5");
  // let max6 = document.querySelector("#max6");
}
//Temperature for entered city
function setCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-name");
  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = `${input.value.toUpperCase()}`;
  let apiKey = `43d32fe7ea32cc95d3a7dc0cc1b76066`;
  //let buttFah = document.querySelector("#farenheit");
  //if (buttFah === "#picked") {
  //let units = "imperial";
  //} else {
  let units = "metric";
  //}
  let city = `${input.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#form-city");
form.addEventListener("submit", setCity);

//Temperature for current location
function showCurrentTemperature(event) {
  event.preventDefault();
  function myPosition(position) {
    // let mainCity2 = document.querySelector("#main-city");
    // mainCity2.innerHTML = `<i class="fas fa-map-pin"></i><br/>HERE`;
    let myLatitude = Math.round(position.coords.latitude);
    let myLongitude = Math.round(position.coords.longitude);
    let apiKey = `43d32fe7ea32cc95d3a7dc0cc1b76066`;
    let units = `metric`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }
  navigator.geolocation.getCurrentPosition(myPosition);
}

let buttLocation = document.querySelector("#current-location");
buttLocation.addEventListener("click", showCurrentTemperature);
