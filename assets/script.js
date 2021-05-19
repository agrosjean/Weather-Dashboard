//Variable to store the searched city
var city = "";
var searchCity = $("#search-city");
var searchButton = $("#search-button");


// variable declaration Current Weather
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWSpeed = $("#wind-speed");
var currentUvIndex = $("#uv-index");
var currentWeather = $("#current-Weather")


//  Variable declaration Future Weather
// var futureTemperature = ;
// var futureHumditiy = ;
// var futureWSpeed = ;
// var futureUvIndex = ;
// var futureWeather = ;

//Set up the API key
var apiKey = "1e03961191fd6205d5b71042cdc5d758";

//  Set up the UrlApi 
var urlApiP = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
var urlApiF = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

// Create function of the city search 

function cityLookUp() {
    $("#search-button").on("click", function () {

        var value = $(this).siblings(".userInput").val();
        console.log(value);
        var date = moment().format('L');

    })
}

//  Create function of the search history





// Create function of the Current Weather of the city selected




// Create function of the Future Weather of the city selected


