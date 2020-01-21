window.addEventListener("load", () => {

    // User's location
    var long;
    var lat;


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude.toPrecision(5);
            lat = position.coords.latitude.toPrecision(5);

            // Proxy notice    
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=bff58e85aa4f33dcceeb856d37837f05`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { name,
                        dt } = data;

                    const {temp} = data.main;

                    const {main} = data.weather[0]

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
                    var nDate = new Date(dt*1000);
                    var dateToString = nDate.toDateString();
                    var day = dateToString.slice(0, 3);
                    var number = dateToString.slice(4, 10);
                    var sortDate = day + ", " + number;
                    cityDate.innerHTML = sortDate;
                    document.getElementById("city-date").appendChild(cityDate);
                });
        });
    } else {

    }
});
