$(document).ready(function() {
      $("#reset").hide();
      $("#extra-btn").hide();

});

// --- User's can press enter instead of clicking on submit button --- 
$("#search").keypress(function (e) {
 var key = e.which;
 if(key == 13)
  {pullDataByCity();
    $(".form-inline").hide()
    $("#current-extra").hide();
    $("#heading").hide();
    $("#reset").show();
    $("#extra-btn").show();
    $("#reset").removeClass("header")
    return false;  
  }
});   

$("#reload").click(function () {
    window.location.reload();
})

$("#extra-btn").click(function(){
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
            const {country,
                sunrise,
                sunset} = data.sys
            const {all} = data.clouds
            const {speed} = data.wind

            let timezoneDiff = (timezone/3600);

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
            var nDate = new Date(dt*1000);
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
            var currSunRis = new Date(sunrise*1000);
            var sunRisDiff = timezoneDiff * 60;
            var realSunRisTime = new Date(currSunRis.getTime() + sunRisDiff * 60 * 1000);
            var currSunRisH = realSunRisTime.getHours();
            var currSunRisM = realSunRisTime.getMinutes();
            currSunrise.innerHTML = "Sunrise at - " + currSunRisH + ":" + currSunRisM + " hrs";
            document.getElementById("current-extra").appendChild(currSunrise);
            var currSunset = document.createElement("p");
            var currSunSet = new Date(sunset*1000);
            var sunSetDiff = timezoneDiff * 60;
            var realSunSetTime = new Date(currSunSet.getTime() + sunSetDiff * 60 * 1000);
            var currSunSetH = realSunSetTime.getHours();
            var currSunSetM = realSunSetTime.getMinutes();
            currSunset.innerHTML = "Sunset at - " + currSunSetH + ":" + currSunSetM + " hrs";
            document.getElementById("current-extra").appendChild(currSunset);
        })

    let apiSearchDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=bff58e85aa4f33dcceeb856d37837f05`;

    fetch(apiSearchDays)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);

            for (let i = 0; i < 20; i +=2) {
                const {dt} = data.list[i];
                const { temp } = data.list[i].main;
                const {main} = data.list[i].weather[0];
                const {timezone} = data.city;

                let timezoneDiffNextDay = timezone/3600

                var div = document.createElement("div");
                div.setAttribute('id', ["newday" + i])
                div.setAttribute('class', 'col-5 col-md-2 next-day');
                document.getElementById("nextday").appendChild(div);
                var h6 = document.createElement("p")
                h6.setAttribute('class', 'next-date')
                var date = new Date(dt * 1000);
                var timeDiff = timezoneDiffNextDay * 60;
                var timeDiffNextDay = new Date(date.getTime() + timeDiff * 60 * 1000);
                var nDate = timeDiffNextDay.toDateString();
                var hours = timeDiffNextDay.getHours();
                var day = nDate.slice(0, 3);
                var number = nDate.slice(4, 10);
                var nDate = day + ", " + number + "<br>" + hours +":00hrs";
                h6.innerHTML = nDate;
                div.appendChild(h6);
                var tempMed = document.createElement("p");
                tempMed.setAttribute('class', 'next-tempMed');
                tempMed.innerHTML = Math.round(temp) + " °C";
                div.appendChild(tempMed);
                var summary = document.createElement("p");
                summary.setAttribute('class', 'next-summary');
                summary.innerHTML = main.toUpperCase();
                div.appendChild(summary);                
            }
        })
};



