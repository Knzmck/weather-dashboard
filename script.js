//loading search History and buttons when page loads
var recentSearches = $("#recent-searches");
if (localStorage.getItem("searchHistory")) {
    var searchHistory = localStorage.getItem("searchHistory").split(",");
    console.log(searchHistory);
    for (let i = 0; i < searchHistory.length; i++) {
        var newBtn = $(
            "<button class='btn btn-link btn-lg active historyBtn'>"
        ).text(titleCase(searchHistory[i]));
        recentSearches.append(newBtn);
    }
    //   Search for last newly searched item by default
    getWeather(searchHistory[0]);
} else {
    var searchHistory = [];
    //   Search for weather in Kansas City if no search History
    getWeather("Kansas City");
}

// function for returning string into the properly capitalized
function titleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
}

// Getting today's date and future dates
const today = moment();
// console.log(moment().format("MM-DD-YYYY"));
$("#today-date").text(moment().format("MM-DD-YYYY"));
$("#0day-date").text(moment().add(1, "days").format("MM-DD-YYYY"));
$("#1day-date").text(moment().add(2, "days").format("MM-DD-YYYY"));
$("#2day-date").text(moment().add(3, "days").format("MM-DD-YYYY"));
$("#3day-date").text(moment().add(4, "days").format("MM-DD-YYYY"));
$("#4day-date").text(moment().add(5, "days").format("MM-DD-YYYY"));

//   Ajax call to retrieve weather data from openweathermap
// console.log(searchHistory);
function getWeather(city) {
    var yourKey = "4c6debcfabe452a31f0225082b5f86a9";
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        yourKey;
    $.ajax({
        url: queryURL,
        method: "GET",
        error: function() {
            alert ("Please type in a valid city name")
        },
        success: function (response) {
        // Taking Coordinates from first response to use in AJAX call later
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var queryURL =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            "&appid=" +
            yourKey;
        //   Var to convert temperature from Kelvin to Fahrenheit
        var temp = (response.main.temp - 273.15) * 1.8 + 32;
        $("#city").text(response.name);
        $("#temp").text("Temperature: " + temp.toFixed(0) + "° F");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");

        // Displays current weather icon
        var iconcode = response.weather[0].icon;
        // var iconurl = "http://openweathermap.org/img/w/10d.png";
        $("#today-icon").attr(
            "src",
            "http://openweathermap.org/img/w/" + iconcode + ".png"
        );

        //   second ajax call (using coordinates) using data above to get a more detailed future forecast and UV index
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
                // first condition checking to see if the searched city is already in the array. It will still search for city but won't add new btn
    if (searchHistory.indexOf(city) !== -1) {
        // Will add new city to Array and create new button if less than 8 cities in array
        } else if (searchHistory.length < 8) {
            searchHistory.push(city);
            //   creates new button for new city
            var newBtn = $("<button class='btn btn-link btn-lg active historyBtn'>").text(titleCase(city));
            recentSearches.append(newBtn);
        // If array is full (limit to 8 cities)- it will push city searched 8 searches ago out of array and replace it with new city. 
        // Buttons won't be deleted until after refresh
        } else {
            searchHistory.shift();
            searchHistory.push(city);
            //   creates new button for new city
            var newBtn = $("<button class='btn btn-link btn-lg active historyBtn'>").text(titleCase(city));
            recentSearches.append(newBtn);
        }
        localStorage.setItem("searchHistory", searchHistory);







            // Changing UV response from string to number
            var uvEl = parseFloat(response.current.uvi.toFixed(1));
            //   checking for UV number and adding corresponding UV color
            function checkUV() {
                if (uvEl <= 2.9) {
                    $("#uv")
                        .css("color", "green")
                        .text("UV Index: " + uvEl);
                } else if (uvEl < 5.9) {
                    $("#uv")
                        .css("color", "orange")
                        .text("UV Index: " + uvEl);
                } else if (uvEl < 7.9) {
                    $("#uv")
                        .css("color", "orangered")
                        .text("UV Index: " + uvEl);
                } else if (uvEl < 10) {
                    $("#uv")
                        .css("color", "red")
                        .text("UV Index: " + uvEl);
                } else {
                    $("#uv")
                        .css("color", "purple")
                        .text("UV Index: " + uvEl);
                }
            }
            // Calling on UV function
            checkUV(uvEl);

            // displaying temperature on future forecast boxes
            $("#0day-temp").text(
                "Temp: " +
                ((response.daily[0].temp.day - 273.15) * 1.8 + 32).toFixed(1) +
                "° F"
            );
            $("#1day-temp").text(
                "Temp: " +
                ((response.daily[1].temp.day - 273.15) * 1.8 + 32).toFixed(1) +
                "° F"
            );
            $("#2day-temp").text(
                "Temp: " +
                ((response.daily[2].temp.day - 273.15) * 1.8 + 32).toFixed(1) +
                "° F"
            );
            $("#3day-temp").text(
                "Temp: " +
                ((response.daily[3].temp.day - 273.15) * 1.8 + 32).toFixed(1) +
                "° F"
            );
            $("#4day-temp").text(
                "Temp: " +
                ((response.daily[4].temp.day - 273.15) * 1.8 + 32).toFixed(1) +
                "° F"
            );

            // display icons for future forecast boxes
            var iconCode = response.daily[0].weather[0].icon;
            $("#0day-icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

            var iconCode = response.daily[1].weather[0].icon;
            $("#1day-icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

            var iconCode = response.daily[2].weather[0].icon;
            $("#2day-icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

            var iconCode = response.daily[3].weather[0].icon;
            $("#3day-icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

            var iconCode = response.daily[4].weather[0].icon;
            $("#4day-icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

            // displaying humidity for future forecast boxes
            $("#0day-humidity").text("Humidity: " + response.daily[0].humidity + "%");
            $("#1day-humidity").text("Humidity: " + response.daily[1].humidity + "%");
            $("#2day-humidity").text("Humidity: " + response.daily[2].humidity + "%");
            $("#3day-humidity").text("Humidity: " + response.daily[3].humidity + "%");
            $("#4day-humidity").text("Humidity: " + response.daily[4].humidity + "%");
        });
    }
})}

// Search button event: grab input from each box, performs search operation, pushes results to array of saved cities, clears out divs
$("#search-btn").click(function (e) {
    e.preventDefault();
    // variable for user typing in city
    var city = $("#city-input").val();
    // Clears out search bar when user searches for city
    $("#city-input").val("");

    // event for ajax calls
    getWeather(city);

});

//   function for searching recently searched city by clicking on city button in left column
$(".historyBtn").click(function (e) {
    getWeather($(this).text());
});

// How to check if a city or not ajax call
