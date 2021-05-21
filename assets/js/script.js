$(document).ready(function () {
    console.log("ready");
    // prepares dom 
    // TODO: GLOBAL VARIABLES
    var currentTemperature = $('#current-temperature');
    var currentCity = $('#current-city');
    var currentHumidity = $('#humidity');
    var currentWSpeed = $('#wind-speed');
    var currentUvIndex = $('#uv-index');
    var currentWeather = $('#current-weather');
    var apiKey = "1e03961191fd6205d5b71042cdc5d758";
    var futureWeather = "";
    var futureHumidity = "";
    var futureTemperature = "";
    var futureWSpeed = "";
    var futureUvIndex = "";
    var timeDispEl = $("#time-display");
    //*! CONFIRMED VARIABLES
    var searchCityBtnEl = $('#search-city');
    // var currentUrlApi; `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    // place listener on the button so it picks up a user click
    // GIVEN a weather dashboard with form inputs
    // WHEN I search for a city
    // THEN I am presented with current and future conditions for that city and that city is added to the search history
    // WHEN I view current weather conditions for that city
    // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    // WHEN I view the UV index
    // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    // WHEN I view future weather conditions for that city
    // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    // WHEN I click on a city in the search history
    // THEN I am again presented with current and future conditions for that city
    // todo: ALL FUNCTIONS
    // todo city search
    // function appendGeoData() {
    // todo IF MUST ADD TO CALL AT BOTTOM IF YOU REACTIVATE
    //     var htmlResult = document.createElement('p');
    //     $('#geometric-data').empty();
    //     $('#geometric-data').append(htmlResult);
    // };
    // todo gets selected city CURRENT weather
    function getCurrentWeather() {
    };
    // todo get future weather
    function getFutureWeather() {
    };
    // function pushToLocalStorage() {
    //     // Save related form data as an object
    //     var cityInfo = {
    //       fullName: fullName.value,
    //       temp: temp.value,
    //     //   comment: comment.value.trim()
    //     };
    //     console.log(cityInfo)
    //     // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    //     localStorage.setItem("city", JSON.stringify(cityInfo));
    //   };
    // todo gets 5 day weather forecast
    function getFiveDayWeatherApi(event) {
        event.preventDefault();
        var city = $("#city-name").val();
        var geoDataTextArea = document.createElement("LI");
        var textnode = document.createTextNode(city);
        geoDataTextArea.appendChild(textnode);
        document.getElementById("geometric-data").appendChild(geoDataTextArea);
        console.log(city)
        var fiveDayUrlApi = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
        console.log("fivedayURL: ", fiveDayUrlApi)
        $.ajax({
            url: fiveDayUrlApi,
            success: function (response) {
                console.log(response);
                // var data = response.data
                // var pulledData = data.main;
                // console.log(pulledData)
                // var temp = data[0].main.temp
                // var fullName =
                // console.log(temp)
                // parkList.push(fullName);
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
    // todo must store value entered by userinput to user storage
    function storeHistory() {
    };
    //  could create elements dynamically and append to body
    // or place elements in line and create dynamic data and append to a placeholder
    // where to store and where to display
    // initial state before user interaction (log in greetings) etc
    // all other info through interaction
    // if its listing info, order it into a list or append items to the appropriate locations 
    // define when storage occurs, and when it is pulled from storage
    // create an array of objects to store this information, 
    // !: completed and troubleshot
    function displayTime() {
        var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
        timeDispEl.text(rightNow);
        var present = rightNow.substring(0, 6);
        console.log(present)
    };
    setInterval(displayTime, 1000);
    searchCityBtnEl.on("click", getFiveDayWeatherApi);
});
