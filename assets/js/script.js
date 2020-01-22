$(".btn").click("load", function () {
    pullDataByCity();
    $(".form-inline").hide()
    return false;
});

$("#reload").click(function () {
    window.location.reload();
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
                dt } = data;

            const { temp } = data.main;

            const { main } = data.weather[0]

            var h1 = document.createElement("p");
            h1.innerHTML = name;
            document.getElementById("city-name").appendChild(h1);
            var cityTemp = document.createElement("p");
            cityTemp.innerHTML = Math.round(temp) + " °C";
            document.getElementById("city-temp").appendChild(cityTemp);
            var cityMain = document.createElement("p");
            cityMain.innerHTML = main
            document.getElementById("city-main").appendChild(cityMain);
            var cityDate = document.createElement("p");
            var nDate = new Date(dt * 1000);
            var dateToString = nDate.toDateString();
            var day = dateToString.slice(0, 3);
            var number = dateToString.slice(4, 10);
            var sortDate = day + ", " + number;
            cityDate.innerHTML = sortDate;
            document.getElementById("city-date").appendChild(cityDate);
        })

    let apiSearchDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=bff58e85aa4f33dcceeb856d37837f05`;

    fetch(apiSearchDays)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);

            for (let i = 0; i < 24; i +=2) {
                const {dt} = data.list[i];

                const { temp_max,
                    temp_min } = data.list[i].main;


                var div = document.createElement("div");
                div.setAttribute('id', ["newday" + i])
                div.setAttribute('class', 'col-2 new-day');
                document.getElementById("nextday").appendChild(div);
                var h6 = document.createElement("p")
                h6.setAttribute('class', 'next-date')
                var date = new Date(dt * 1000);
                var nDate = date.toDateString();
                var day = nDate.slice(0, 3);
                var number = nDate.slice(4, 10);
                var nDate = day + ", " + number;
                h6.innerHTML = nDate;
                div.appendChild(h6);
                var tempMax = document.createElement("p");
                tempMax.setAttribute('class', 'next-tempMax');
                tempMax.innerHTML = Math.round(temp_max) + " °C";
                div.appendChild(tempMax);
                var tempMin = document.createElement("p");
                tempMin.setAttribute('class', 'next-tempMin');
                tempMin.innerHTML = Math.round(temp_min) + " °C";
                div.appendChild(tempMin);
                
                let datum = new Date(dt*1000)
                console.log(datum)
            }
        })
};



