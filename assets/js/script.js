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
    pullDataByCity();
    $(".form-inline").hide()
    $("#current-extra").hide();
    $("#heading").hide();
    $("#reset").show();
    $("#current-div").show();
    $(".carousel").show();
    $("#current").show();
    $("#reset").removeClass("header");
};

// --- When user press "Try a different city" button, page reloads ---
$("#reload").click(function () {
    window.location.reload();
})

// --- "More data" button toggles bettwen a map location and more data about weather for current day --- 
$("#extra-btn").click(function () {
    $("#current-extra").toggle();
    $("#map").toggle();
})

// --- If the city name is not in API database --- 
function notReal() {
    console.log('"Its fake!" - senator Vreenak')
    $(".notReal").show();
    $("#notReal").text("Not a real city!")
    $("#current").hide();
    $("#current-div").toggle();
    $("#carousel").toggle();
}

// --- Searching for a city and pulling data from the API's
function pullDataByCity() {

    let city = document.getElementById("search").value;
    let apiSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=bff58e85aa4f33dcceeb856d37837f05`;

    // --- Call to OpenWeather API and current data ---
    fetch(apiSearch)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            // --- If city doesn't exist ---
            if (data.cod == 404) {
                notReal();
                $("#cityName").text(city);
            }

            // --- Otherwise, pull data from API
            else {
                const { name,
                    dt,
                    timezone } = data;
                const { temp,
                    humidity,
                    pressure } = data.main;
                const { main } = data.weather[0]
                const { country,
                    sunrise,
                    sunset } = data.sys
                const { all } = data.clouds
                const { speed } = data.wind
                const { lat,
                    lon } = data.coord

                let timezoneDiff = (timezone / 3600);

                // --- Gmap API has to be here in order to pull lat and long. I have tried putting it in separate function but it wouldn't work ---
                new google.maps.Map(document.getElementById('map'), {
                    center: { lat: lat, lng: lon },
                    zoom: 10
                });

                // --- Current weather in city ---
                $("#city-name").text(name + ", " + country);
                $("#city-temp").text(Math.round(temp) + " °C");
                $("#city-main").text(main)
                var nDate = new Date(dt * 1000);
                var timeDiff = timezoneDiff * 60;
                var offsetTime = new Date(nDate.getTime() + timeDiff * 60 * 1000);
                var hours = offsetTime.getHours();
                var dateToString = offsetTime.toDateString();
                var day = dateToString.slice(0, 3);
                var number = dateToString.slice(4, 10);
                $("#city-date").text(day + ", " + number + ", " + hours + ":00hrs");

                // --- More data hidden behind map. Toggles on "More data" button ---
                $("#clouds").text("Clouds - " + all + "%")
                
                
                $("#humidity").text("Humidity - " + humidity + "%")
                
                
                $("#pressure").text("Air pressure - " + pressure + " hPa")
                
                
                var currWind = document.createElement("p");
                currWind.innerHTML = "Wind speed - " + speed + " m/s";
                document.getElementById("current-extra").appendChild(currWind);
                var currSunrise = document.createElement("p");
                var currSunRis = new Date(sunrise * 1000);
                var sunRisDiff = timezoneDiff * 60;
                var realSunRisTime = new Date(currSunRis.getTime() + sunRisDiff * 60 * 1000);
                var currSunRisH = realSunRisTime.getHours();
                var currSunRisM = realSunRisTime.getMinutes();
                currSunrise.innerHTML = "Sunrise at - " + currSunRisH + ":" + currSunRisM + " hrs";
                document.getElementById("current-extra").appendChild(currSunrise);
                var currSunset = document.createElement("p");
                var currSunSet = new Date(sunset * 1000);
                var sunSetDiff = timezoneDiff * 60;
                var realSunSetTime = new Date(currSunSet.getTime() + sunSetDiff * 60 * 1000);
                var currSunSetH = realSunSetTime.getHours();
                var currSunSetM = realSunSetTime.getMinutes();
                currSunset.innerHTML = "Sunset at - " + currSunSetH + ":" + currSunSetM + " hrs";
                document.getElementById("current-extra").appendChild(currSunset);

                const proxy = 'https://cors-anywhere.herokuapp.com/';
                let apiSearchDays = `${proxy}https://api.darksky.net/forecast/81bd9bfc27e0a863848c0d003dda4468/${lat},${lon}?units=si`;

                fetch(apiSearchDays)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);

                        for (i = 1; i < 9; i++) {
                            const { summary,
                                temperatureHigh,
                                temperatureLow,
                                precipProbability,
                                humidity,
                                pressure,
                                windSpeed,
                                time } = data.daily.data[i];

                            console.log(data.daily.data[i])

                            var div = document.createElement("div");
                            div.setAttribute('id', ["newday" + i])
                            div.setAttribute('class', 'carousel-item new-day');
                            document.getElementById("carousel").appendChild(div);
                            var h6 = document.createElement("h6")
                            var date = new Date(time * 1000);
                            var nDate = date.toDateString();
                            var day = nDate.slice(0, 3);
                            var number = nDate.slice(4, 10);
                            var nDate = day + ", " + number;
                            h6.innerHTML = nDate;
                            div.appendChild(h6);
                            var h5 = document.createElement("h5");
                            h5.innerHTML = summary;
                            div.appendChild(h5);
                            var par = document.createElement("p")
                            par.setAttribute('class', 'next-temp')
                            par.innerHTML = " Temperature <br> Max: " + Math.round(temperatureHigh) + "  °C <br> Min: " + Math.round(temperatureLow) + " °C";
                            div.appendChild(par);
                            var parPrecipitation = document.createElement("p")
                            parPrecipitation.setAttribute('class', 'next-precip')
                            parPrecipitation.innerHTML = "Rain: " + Math.round(precipProbability * 100) + " %"
                            div.appendChild(parPrecipitation);

                        }
                    })
            }
        })
};

