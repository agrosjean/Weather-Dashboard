var city;
$(document).ready(function () {
    console.log("ready");
    // prepares dom 
    // TODO: GLOBAL VARIABLES
    var dayOneContainer = $("#day-one-container");
    var currentTemperature = $('#current-temperature');
    var currentCity = $('#current-city');
    var currentWSpeed = $('#wind-speed');
    var futureWSpeed = "";
    var previousCities = $("#previous-cities")
    //*! CONFIRMED VARIABLES
    var searchCityBtnEl = $('#search-city');
    var timeDispEl = $("#time-display");
    var apiKey = "1e03961191fd6205d5b71042cdc5d758";

    // *! Gets selected city CURRENT weather
    function getCurrentWeather() {
        city = $("#city-name").val();
        console.log("current searched was: ", city);

        var isExist = localStorage.getItem(city)
        if (isExist == null || isExist == undefined) {
            let a = document.createElement('a')
            a.href = '#'
            a.id = city
            a.onclick = "openHistory(" + city + ")"

            // $("#previous-cities").appendparissa2004(a)
        }

        $("#current-city").text(city);
        var currentUrlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        console.log("current day communication succeed: ", currentUrlApi);
        $.ajax({
            url: currentUrlApi,
            success: function (response) {
                addCityToPreviousCities(city);
                console.log("object extracted: ", response);
                console.log("attempting to pull the json: ", response.weather[0].icon);
                console.log("this is the lat, then lon: ", response.coord.lat, response.coord.lon);
                console.log("this is the humidity:", response.humidity);
                getFiveDayWeatherApi(response.coord.lat, response.coord.lon);
            },
            error: function (xhr, status, error) {
                console.log("status: ", status)
                console.log("error: ", error)
            },
            complete: function (xhr, status) {
                console.log("complete: ", status)
            }
        })
    };

    // *! Gets 5 day weather forecast
    function getFiveDayWeatherApi(lat, lon) {
        city = $("#city-name").val();
        console.log("current searched was: ", city)
        var fiveDayUrlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=imperial&appid=${apiKey}`
        console.log("fivedayURL: ", fiveDayUrlApi)
        $.ajax({
            url: fiveDayUrlApi,
            success: function (response) {
                console.log("object extracted: ", response);
                console.log(response.daily[0].dt);
                sessionStorage.key(city, JSON.stringify(response))
                createWeather(response)
            },
            error: function (xhr, status, error) {
                console.log("status: ", status)
                console.log("error: ", error)
            },
            complete: function (xhr, status) {
                console.log("complete: ", status)
            }
        })
    };
    //  TODO: MUST SET RENDER LOCAL STORAGE TO THE SCREEN
    // *! COMPLETED time display function
    function displayTime() {
        var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
        timeDispEl.text(rightNow);
        var present = rightNow.substring(0, 6);
        console.log(present)
    };

    function addCityToPreviousCities(city) {
        const citiesDivs = $('.previous-cities > div.city').toArray();
        const cities = citiesDivs.map(el => el.innerText);
        if (cities.includes(city)) {
            return;
        }
        previousCities.append(`
            <div class='city'>${city}</div>
        `);
    }

    $(searchCityBtnEl).click(function () {
        $("#current-weather-container").empty();
        $("#day-one-container").empty();
        $("#day-two-container").empty();
        $("#day-three-container").empty();
        $("#day-four-container").empty();
        $("#day-five-container").empty();

        getCurrentWeather();
    });

    setInterval(displayTime, 1000);
});

function clearHistory() {
    $("#previous-cities").empty();
}

function createWeather(response) {
    for (var i = 0; i < 6; i++) {
        $("div" + '[data-index="' + i + '"]').empty()
        var weather = response.daily[i].weather[0].description;
        var icon = response.daily[i].weather[0].icon;
        var temp = response.daily[i].temp.day;
        var hum = response.daily[i].humidity;
        var wind = response.daily[i].wind_speed;
        var uvi = response.daily[i].uvi;
        var iconImage = $("<img>").attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
        console.log(iconImage)
        console.log(response.daily[i].temp.day);
        console.log("div" + '[data-index="' + i + '"]')
        $("div" + '[data-index="' + i + '"]').append(
            " weather: " + weather,
            iconImage, "<br>",
            " temp: " + temp, "<br>", "Humidity: " + hum, "<br>", "Wind Speed: " + wind, "<br>", " uv index: " + uvi,

        );
        console.log(uvi)
        // TODO fetch on uv index then displays color to page
        // if (uvi <= 2) {
        //     document.getElementsByTagName("H1")[0].setAttribute("class", "democlass");
        //     uvInd.css({ "background-color": "green" })
        // } else if (uvi <= 5) {
        //     uvInd.css({ "background-color": "yellow", "color": "black" })
        // } else if (uvi <= 7) {
        //     uvInd.css({ "background-color": "orange" })
        // } else if (uvi <= 10) {
        //     uvInd.css({ "background-color": "red" })
        // } else if (uvi >= 11) {
        //     uvInd.css({ "background-color": "purple" })
        // }
        storeObj = {
            weather: weather,
            icon: icon,
            temp: temp,
            uvi: uvi,
            humidity: hum,
        };

        //*! COMPLETED must store value entered by userinput to user storage
        localStorage.setItem(city + " day-" + i, JSON.stringify(storeObj));
    };
}

function openHistory(key) {
    var response = localStorage.key(key)
    createWeather(response)
}