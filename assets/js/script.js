// --- Landing page ---
$(document).ready(function () {
    $("#reset").hide();
    $("#current-div").hide();
    $(".carousel").hide();
    $(".notReal").hide();
    $("#current").hide();
});

// --- When user enters a city name and presses enter --- 
function searchCity() {
    pullData();
    $(".form-inline").hide();
    $("#current-extra").hide();
    $("#heading").hide();
    $("#reset").show();
    $("#current-div").show();
    $(".carousel").show();
    $("#current").show();
    $("#reset").removeClass("header");
}

// --- When user press "Try a different city" button, page reloads ---
$("#reload").click(function () {
    window.location.reload();
});

// --- Searching for a city in database and checking is it in or not ---
function pullData() {
    let xhr = new XMLHttpRequest();
    let city = document.getElementById("search").value;

    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=bff58e85aa4f33dcceeb856d37837f05`);
    xhr.send();
    xhr.onreadystatechange = function () {
        // --- If the city is NOT in database.....
        if (this.readyState == 4 && this.status == 404) {
            notInDatabase();
            $("#cityName").text(city);
        }
        // --- otherwise, pull data and show it.
        else if (this.readyState == 4 && this.status == 200) {
            setDataOpenWeather(JSON.parse(this.responseText));
            currentWeather();
            extraData();
        }
    };
}

// --- If the city name is NOT in database --- 
function notInDatabase() {
    $(".notReal").show();
    $("#current").hide();
    $("#current-div").toggle();
    $("#carousel").toggle();
}

// --- Deserializing OpenWeather JSON ---
function setDataOpenWeather(jsonData) {
    data = jsonData;
}

// --- Current weather in the city---
function currentWeather() {
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

// --- Extra data for current day ---
function extraData() {
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
    if (currSunRisH < 10) { currSunRisH = "0" + currSunRisH }
    let currSunRisM = currSunRis.getMinutes();
    if (currSunRisM < 10) { currSunRisM = "0" + currSunRisM }
    $("#sunrise").text("Sunrise at - " + currSunRisH + ":" + currSunRisM + " hrs");
    let currSunSet = new Date((sunset + timezone) * 1000);
    let currSunSetH = currSunSet.getHours();
    let currSunSetM = currSunSet.getMinutes();
    if (currSunSetM < 10) { currSunSetM = "0" + currSunSetM }
    $("#sunset").text("Sunset at - " + currSunSetH + ":" + currSunSetM + " hrs");
}