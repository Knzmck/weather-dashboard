// api key 3a40bf9c7760e0838221c467c64d1d49

// Search button event: grab input from each box, performs search operation, clears out divs
$("#search-btn").click(function (e) {
    e.preventDefault()

    var city = $("#city-input").val();
    var yourKey = "4c6debcfabe452a31f0225082b5f86a9";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="  + yourKey;
    $.ajax({
        url: queryURL,
        method: 'GET'


    }).then(function (response) {
        console.log(response);
            var temp = (response.main.temp - 273.15) * 1.8 + 32;
            $("#city").text(response.name);
            $("#temp").text(temp.toFixed(0) + "° F");
            $("#wind").text(response.wind.speed + " MPH");
            $("#humidity").text(response.main.humidity + "%");

    })
})