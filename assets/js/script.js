window.addEventListener("load", () => {

    // User's location
    var long;
    var lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude.toPrecision(4);
            lat = position.coords.latitude.toPrecision(4);

            // Proxy notice    
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=bff58e85aa4f33dcceeb856d37837f05`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const { name,
                        dt } = data;

                    var h1 = document.createElement("h1");
                    var date = new Date(dt * 1000);
                    h1.innerHTML = name + date;
                    document.getElementById("city-name").appendChild(h1);

                });
        })
    }
});