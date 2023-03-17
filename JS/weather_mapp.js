(function(){
    "use strict";

    //map
    mapboxgl.accessToken = myToken;
    const map = new mapboxgl.Map(
        {
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
            center: [-84.261508, 33.469448], // starting position [lng, lat]
            zoom: 5, // starting zoom (0 - 20)
        }
    );
    var myKey = 'aaf23a8dad3a01c63317bddadf73e7b2';

    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions:{
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    }));

    //marker

    let weatherMarker = new mapboxgl.Marker({draggable: true})
        .setLngLat([-84.261508, 33.469448])
        .addTo(map);
    console.log(weatherMarker);
    function onDragEnd() {
        let lngLat = weatherMarker.getLngLat();
        let arrWeather = [lngLat.lng, lngLat.lat];
        console.log(lngLat);
        weatherData(arrWeather)
        fiveDayForecast(arrWeather)
    }
    weatherMarker.on(`dragend`, onDragEnd);



    function getLocation(searchString) {
        geocode(searchString, myToken).then(function (results) {
            weatherMarker.setLngLat(results);
            map.flyTo({center: results, zoom: 9});
            weatherData(results);
            // weatherForecast(results);
            fiveDayForecast(results);
        })
    }

    //current weather

    function weatherData(results) {
        $.get(`https://api.openweathermap.org/data/2.5/weather?lat=${results[1]}&lon=${results[0]}&appid=${myKey}&units=imperial`).done(function (data) {
            let html = "";
            html += `<h6>Date: ${dateConversion(data.dt)}</h6>`;
            html += `<h6>City: ${data.name}</h6>`;
            html += `<h6>Weather: ${data.weather[0].description}</h6>`;
            html += `<h6>Wind speed: ${parseInt(data.wind.speed)} knots</h6>`;
            html += `<h6>Temp: ${parseInt(data.main.temp)} &deg;</h6>`;
            html += `<h6>Humidity: ${parseInt(data.main.humidity)}</h6>`;
            $("#currentCard").get(html);
        })
    }

    //five-day forecast

    function fiveDayForecast(results) {
        $.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${results[1]}&lon=${results[0]}&exclude=current,minutely,hourly&appid=${myKey}&units=imperial`).done(function(data){
            let html = '';
            for (let i = 1; i < 6; i++) {
                const newDate = new Date(data.daily[i].dt * 1000);
                html += `<h2>Date: ${newDate.toDateString()}</h2>`;
                html += `<h6>Weather: ${data.daily[i].weather[0].description}</h6>`;
                html += `<h6>Temp: ${data.daily[i].temp.day} &deg;</h6>`;
                html += `<h6>Humidity: ${data.daily[i].humidity}</h6>`;
            }
            $('#cardGroup').html(html)
        })
    }

    //input search and submit botton

    $('#searchBtn').click(function (e) {
        e.preventDefault();
        getLocation($('#citySearch').val());
    });

    //dt conversion

    let dateConversion = function (timeStamp) {
        let date = new Date(timeStamp * 1000).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
        return date;
    }
})();