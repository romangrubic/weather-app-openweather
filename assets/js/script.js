$(document).ready(function () {
    $("#reset").hide();
    $("#extra-btn").hide();
    $(".carousel").hide();

});

// --- User's can press enter instead of clicking on submit button --- 
$("#search").keypress(function (e) {
    var key = e.which;
    if (key == 13) {
        pullDataByCity();
        $(".form-inline").hide()
        $("#current-extra").hide();
        $("#heading").hide();
        $("#reset").show();
        $("#extra-btn").show();
        $("#reset").removeClass("header")
        $(".carousel").show();
        return false;
    }
});

$("#reload").click(function () {
    window.location.reload();
})

$("#extra-btn").click(function () {
    $("#current-extra").fadeToggle();
})



function pullDataByCity() {

    let city = document.getElementById("search").value;
    let apiSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=bff58e85aa4f33dcceeb856d37837f05`;

    fetch(apiSearch)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
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

            $("#current").addClass("current")
            var h1 = document.createElement("p");
            h1.innerHTML = name + ", " + country;
            document.getElementById("city-name").appendChild(h1);
            var cityTemp = document.createElement("p");
            cityTemp.innerHTML = Math.round(temp) + " °C";
            document.getElementById("city-temp").appendChild(cityTemp);
            var cityMain = document.createElement("p");
            cityMain.innerHTML = main.toUpperCase()
            document.getElementById("city-main").appendChild(cityMain);
            var cityDate = document.createElement("p");
            var nDate = new Date(dt * 1000);
            var timeDiff = timezoneDiff * 60;
            var offsetTime = new Date(nDate.getTime() + timeDiff * 60 * 1000);
            var hours = offsetTime.getHours();
            var dateToString = offsetTime.toDateString();
            var day = dateToString.slice(0, 3);
            var number = dateToString.slice(4, 10);
            var sortDate = day + ", " + number + "<br>" + hours + ":00hrs";
            cityDate.innerHTML = sortDate;
            document.getElementById("city-date").appendChild(cityDate);

            // --- Extra data
            var cloudSky = document.createElement("p");
            cloudSky.innerHTML = "Clouds - " + all + "%";
            document.getElementById("current-extra").appendChild(cloudSky);
            var currHumidity = document.createElement("p");
            currHumidity.innerHTML = "Humidity - " + humidity + "%";
            document.getElementById("current-extra").appendChild(currHumidity);
            var currPressure = document.createElement("p");
            currPressure.innerHTML = "Air pressure - " + pressure + " hPa";
            document.getElementById("current-extra").appendChild(currPressure);
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

                    for (i = 1; i < 7; i++) {
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
        })
};
