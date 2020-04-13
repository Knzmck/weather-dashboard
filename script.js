// api key 3a40bf9c7760e0838221c467c64d1d49

// Search button event: grab input from each box, performs search operation, clears out divs
$("#search-btn").click(function () {

    var city = $("#city-input").val();
    var yourKey = "3a40bf9c7760e0838221c467c64d1d49";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="  + yourKey;
    $.ajax({
        url: queryURL,
        method: 'GET'


    }).then(function (response) {
        alert(response);
        // return city name to H1 
        // return temp, humidity, wind speed and UV Index (changing color with UV Index value green, yellow, red)
        // return 5 day forecast for chosen city with date, picture of sun/rain/clouds/storm, high temp, and humidity 
        // create new divs with recent searches 
        // clear search box

    })
})

// create same function for clicking on saved city


// when user saves 8 cities, oldest city gets kicked off list and newest city gets put on list first

// UV Index values 0-3 is green, 3-5 is yellow moderate, 6-7 is orange high, 8-10 is red very high, 11+ is violet extreme