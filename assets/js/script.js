// --- Landing page ---
$(document).ready(function () {
    $("#reset").hide();
    $("#current-weather").hide();
    $(".carousel").hide();
    $(".notReal").hide();
});

// --- When user enters a city name and presses enter --- 
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    pullData();
    $("#current-extra").hide();
    $(".navbar").hide();
    $("#heading").hide();
    $(".first-slide").hide();
    $("#current-weather").show();
    $("#reset").show();
    $(".carousel").show();
    $("#reset").removeClass("header");
});

// --- Country selector ---
var countryList = document.getElementById("selectCountry"); 
let xhr = new XMLHttpRequest();

xhr.open("GET", `assets/json/country.json`);
xhr.send();
xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            setDataCountry(JSON.parse(this.responseText));
            selectCountry();
            }
        };

// --- Deserializing country.json ---
function setDataCountry(jsonData) {
    data = jsonData;
}

// --- Loop to create list of countries ---
function selectCountry(){
    for (i = 0; i < data.length; i++) {
    let option = data[i].Name.slice(0, 15) +", "+ data[i].Code;
    let list = document.createElement("option");
    list.textContent = option;
    list.value = option;
    countryList.appendChild(list);}
}
    
// --- When user press "Try a different city" button, page reloads ---
$("#reload").click(function () {
    window.location.reload();
});

// --- Searching for a city in database and checking is it in or not ---
function pullData() {
    let xhr = new XMLHttpRequest();
    let city = document.getElementById("search").value.toUpperCase();
    if (city[2] == " "){ city = "(blank space)" ;}
    let country = document.getElementById("selectCountry").value;
    let countryCode = country.slice(-2);

    // --- If user did NOT SPECIFIED country ---
    if(countryCode == " -")
        {xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=bff58e85aa4f33dcceeb856d37837f05`);}
    
    // --- If user SPECIFIED country ---
    else{xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&APPID=bff58e85aa4f33dcceeb856d37837f05`);}
    
    xhr.send();
    xhr.onreadystatechange = function () {
        // --- If the city is NOT in database.....
        if (this.readyState == 4 && this.status == 404) {
            notInDatabase();

            // --- If the user searched for city but didn't select country ---
            if(country.slice(-2) == " -"){
            $("#cityName").text('"' + city + '"');}
            
            // --- If the user selected country ---
            else {$("#cityName").text('"' + city + ", " + country.slice(0, -4)+ '"');}
        }
        // --- otherwise, pull data and show it.
        else if (this.readyState == 4 && this.status == 200) {
            setDataOpenWeather(JSON.parse(this.responseText));
            currentWeather();
            initMap();
            currentWeatherExtraData();
            darkSkyAPI();
        }
    };
}
// --- If the city name is NOT in database --- 
function notInDatabase() {
    $("#current-weather").hide();
    $(".notReal").show();
    $("#carousel").toggle();
}

// --- Deserializing OpenWeather JSON ---
function setDataOpenWeather(jsonData) {
    data = jsonData;
}

// --- Current weather in the city---
function currentWeather() {
    $("#loader-current").toggleClass("hide-loader");
    const { name,
        dt,
        timezone } = data;
    const { temp } = data.main;
    const { main } = data.weather[0];
    const { country } = data.sys;

    $("#city-name").text(name + ", " + country);
    $("#city-temp").text(Math.round(temp) + " °C");
    $("#city-main").text(main);
    let nDate = new Date((dt + timezone) * 1000);
    let localDate = nDate.toDateString();
    $("#city-date").html(localDate.slice(0, 3) + ", " + localDate.slice(4, 10) + "<br>" + nDate.getHours() + ":00 hrs");
}

// --- "More data" button toggles bettwen "Google maps" and "extra data for current day" --- 
$("#extra-btn").click(function () {
    $("#current-extra").slideToggle();
    $("#map").slideToggle();
});

// --- Location of the City on Google maps ---
function initMap() {
    $("#loader-map").toggleClass("hide-loader");
    const { lat,
        lon } = data.coord;

    let cityLatLon = { lat: lat, lng: lon };
    let map = new google.maps.Map(document.getElementById('map'), {
        center: cityLatLon,
        zoom: 10
    });
    let marker = new google.maps.Marker({
        position: cityLatLon,
        map: map
    });
    marker.setMap(map);
}

// --- Extra data for current day ---
function currentWeatherExtraData(){
    const { timezone } = data;
    const { humidity,
        pressure } = data.main;
    const { sunrise,
        sunset } = data.sys;
    const { all } = data.clouds;
    const { speed } = data.wind;

    $("#clouds").text("Clouds - " + all + "%");
    $("#humidity").text("Humidity - " + humidity + "%");
    $("#pressure").text("Air pressure - " + pressure + " hPa");
    $("#wind").text("Wind speed - " + speed + " m/s");
    // --- Sunrise and sunset based on that city local time ---
    let currSunRis = new Date((sunrise + timezone) * 1000);
    let currSunRisH = currSunRis.getHours();
    if (currSunRisH < 10) { currSunRisH = "0" + currSunRisH ;}
    let currSunRisM = currSunRis.getMinutes();
    if (currSunRisM < 10) { currSunRisM = "0" + currSunRisM ;}
    $("#sunrise").text("Sunrise at - " + currSunRisH + ":" + currSunRisM + " hrs");
    let currSunSet = new Date((sunset + timezone) * 1000);
    let currSunSetH = currSunSet.getHours();
    let currSunSetM = currSunSet.getMinutes();
    if (currSunSetM < 10) { currSunSetM = "0" + currSunSetM ;}
    $("#sunset").text("Sunset at - " + currSunSetH + ":" + currSunSetM + " hrs");
}

// --- DarkSky API for future days weather carousel ---
function darkSkyAPI() {
    const { lat,
        lon } = data.coord;

    let xhr = new XMLHttpRequest();
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    xhr.open("GET", `${proxy}https://api.darksky.net/forecast/81bd9bfc27e0a863848c0d003dda4468/${lat},${lon}?units=si`);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            setDataDarkSky(JSON.parse(this.responseText));
            $("#loader-carousel").toggleClass("hide-loader");
            $(".first-slide").show();
            carouselLoop();
        }
    };
}

// --- Deserializing DarkSky JSON ---
function setDataDarkSky(jsonData) {
    data = jsonData;
}

// --- Loop for creating carousel weather for future days ---
function carouselLoop() {
    for (i = 1; i < data.daily.data.length; i++) {
        const { summary,
            temperatureHigh,
            temperatureLow,
            precipProbability,
            time } = data.daily.data[i];

        /* --- I used Javascript to create the elements in 
            the carousel instead of using HTML and having 
            to write each day every time --- */
        let nextDayCarousel = document.createElement("div");
        nextDayCarousel.setAttribute('class', 'carousel-item next-day');
        document.getElementById("carousel").appendChild(nextDayCarousel);
        let nextDayDate = document.createElement("h6");
        let date = new Date(time * 1000).toDateString();
        nextDayDate.innerHTML = date.slice(0, 3) + ", " + date.slice(4, 10);
        nextDayCarousel.appendChild(nextDayDate);
        let h5 = document.createElement("h5");
        h5.innerHTML = summary;
        nextDayCarousel.appendChild(h5);
        let par = document.createElement("p");
        par.setAttribute('class', 'next-temp');
        par.innerHTML = " Temperature <br> Max: " + Math.round(temperatureHigh) + "  °C <br> Min: " + Math.round(temperatureLow) + " °C";
        nextDayCarousel.appendChild(par);
        let parPrecipitation = document.createElement("p");
        parPrecipitation.setAttribute('class', 'next-precip');
        parPrecipitation.innerHTML = "Rain: " + Math.round(precipProbability * 100) + " %";
        nextDayCarousel.appendChild(parPrecipitation);
    }
}