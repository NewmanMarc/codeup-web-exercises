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
        let addhtml= ""

        // day1
        addhtml += `<h4>Current location: ${data.city.name}</h4>`;
        addhtml += `<h4>Date: ${myToken.list[1].dt_txt}</h4>`
        addhtml += `<h4>Future weather: ${myToken.list[1].weather[0].description}</h4>`;
        addhtml += `<h5>Current average wind speed: ${parseInt(myToken.list[1].wind.speed)} knots</h5>`;
        addhtml += `<h5>Current Temperature: ${parseInt(myToken.list[1].main.temp)} &deg;</h5>`;
        addhtml += `<h5>Current humidity: ${parseInt(myToken.list[1].main.humidity)}</h5>`;
        $("#day1").html(addhtml);


        // day2
        addhtml += `<h4>Current location: ${myKey.city.name}</h4>`;
        addhtml += `<h4>Date: ${myKey.list[1].dt_txt}</h4>`
        addhtml += `<h4>Future weather: ${myKey.list[1].weather[0].description}</h4>`;
        addhtml += `<h5>Current average wind speed: ${parseInt(myKey.list[1].wind.speed)} knots</h5>`;
        addhtml += `<h5>Current Temperature: ${parseInt(myKey.list[1].main.temp)} &deg;</h5>`;
        addhtml += `<h5>Current humidity: ${parseInt(myKey.list[1].main.humidity)}</h5>`;
        $("#day2").html(addhtml);


        // day1
        addhtml += `<h4>Current location: ${myKey.city.name}</h4>`;
        addhtml += `<h4>Date: ${myKey.list[1].dt_txt}</h4>`
        addhtml += `<h4>Future weather: ${myKey.list[1].weather[0].description}</h4>`;
        addhtml += `<h5>Current average wind speed: ${parseInt(myKey.list[1].wind.speed)} knots</h5>`;
        addhtml += `<h5>Current Temperature: ${parseInt(myKey.list[1].main.temp)} &deg;</h5>`;
        addhtml += `<h5>Current humidity: ${parseInt(myKey.list[1].main.humidity)}</h5>`;
        $("#day3").html(addhtml);


        // day1
        addhtml += `<h4>Current location: ${myKey.city.name}</h4>`;
        addhtml += `<h4>Date: ${myKey.list[1].dt_txt}</h4>`
        addhtml += `<h4>Future weather: ${myKey.list[1].weather[0].description}</h4>`;
        addhtml += `<h5>Current average wind speed: ${parseInt(myKey.list[1].wind.speed)} knots</h5>`;
        addhtml += `<h5>Current Temperature: ${parseInt(myKey.list[1].main.temp)} &deg;</h5>`;
        addhtml += `<h5>Current humidity: ${parseInt(myKey.list[1].main.humidity)}</h5>`;
        $("#day4").html(addhtml);

        // day1
        addhtml += `<h4>Current location: ${myKey.city.name}</h4>`;
        addhtml += `<h4>Date: ${myKey.list[1].dt_txt}</h4>`
        addhtml += `<h4>Future weather: ${myKey.list[1].weather[0].description}</h4>`;
        addhtml += `<h5>Current average wind speed: ${parseInt(myKey.list[1].wind.speed)} knots</h5>`;
        addhtml += `<h5>Current Temperature: ${parseInt(myKey.list[1].main.temp)} &deg;</h5>`;
        addhtml += `<h5>Current humidity: ${parseInt(myKey.list[1].main.humidity)}</h5>`;
        $("#day5").html(addhtml);
    }

    //five-day forecast

    function fiveDayForecast(results) {
        let addhtml= ""

        // day1
        addhtml += `<h4>Current location: ${myKey.city.name}</h4>`;
        addhtml += `<h4>Date: ${myKey.list[1].dt_txt}</h4>`
        addhtml += `<h4>Future weather: ${myKey.list[1].weather[0].description}</h4>`;
        addhtml += `<h5>Current average wind speed: ${parseInt(myKey.list[1].wind.speed)} knots</h5>`;
        addhtml += `<h5>Current Temperature: ${parseInt(myKey.list[1].main.temp)} &deg;</h5>`;
        addhtml += `<h5>Current humidity: ${parseInt(myKey.list[1].main.humidity)}</h5>`;
        $("#day1").html(addhtml);
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