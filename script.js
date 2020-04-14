//loading search History and buttons when page loads
if (localStorage.getItem("searchHistory")) {
    var searchHistory = localStorage.getItem("searchHistory").split(",");
    console.log(searchHistory);
    for (let i = 0; i < searchHistory.length; i++) {
        var recentSearches = $("#recent-searches")
        var newBtn = $("<button class='btn btn-link btn-lg active historyBtn'>").text(searchHistory[i])
        recentSearches.append(newBtn)
    }
  }
  else{
      var searchHistory = []
  }
  // Getting today's date and future dates

  const today = moment();
  console.log( moment().format('MM-DD-YYYY'));
  $("#today-date").text(moment().format('MM-DD-YYYY'))
  $("#0day-date").text(moment().add(1, 'days').format('MM-DD-YYYY'));
  $("#1day-date").text(moment().add(2, 'days').format('MM-DD-YYYY'));
  $("#2day-date").text(moment().add(3, 'days').format('MM-DD-YYYY'));
  $("#3day-date").text(moment().add(4, 'days').format('MM-DD-YYYY'));
  $("#4day-date").text(moment().add(5, 'days').format('MM-DD-YYYY'));
  
//   Ajax call to retrieve weather data from openweathermap
  console.log(searchHistory);
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
    }).then(function (response) {
      console.log(response);
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var queryURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat + "&lon=" + lon + "&appid=" + yourKey;
          var temp = (((response.main.temp)-273.15) * 1.8 + 32)
      $('#city').text(response.name);
      $('#temp').text(temp.toFixed(0) + '° F')
      $('#wind').text(response.wind.speed + ' MPH');
      $('#humidity').text(response.main.humidity + '%');
//   second ajax call using data above to get a more detailed future forecast and UV index
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
         // test response
        console.log(response);

        //  displaying UV index as a number
        var uvEl = parseFloat(response.current.uvi.toFixed(1));
        $('#uv').text(uvEl)

        // displaying temperature on future forecast boxes
        $('#0day-temp').text('Temp: ' + (((response.daily[0].temp.day)-273.15) * 1.8 + 32).toFixed(1) + '° F')
        $('#1day-temp').text('Temp: ' + (((response.daily[1].temp.day)-273.15) * 1.8 + 32).toFixed(1) + '° F')
        $('#2day-temp').text('Temp: ' + (((response.daily[2].temp.day)-273.15) * 1.8 + 32).toFixed(1) + '° F')
        $('#3day-temp').text('Temp: ' + (((response.daily[3].temp.day)-273.15) * 1.8 + 32).toFixed(1) + '° F')
        $('#4day-temp').text('Temp: ' + (((response.daily[4].temp.day)-273.15) * 1.8 + 32).toFixed(1) + '° F')

        // displaying humidity for future forecast boxes
       $('#0day-humidity').text('Humidity: ' + (response.daily[0].humidity) + '%');
       $('#1day-humidity').text('Humidity: ' + (response.daily[1].humidity) + '%');
       $('#2day-humidity').text('Humidity: ' + (response.daily[2].humidity) + '%');
       $('#3day-humidity').text('Humidity: ' + (response.daily[3].humidity) + '%');
       $('#4day-humidity').text('Humidity: ' + (response.daily[4].humidity) + '%');


      });
    });
  }
  

  // Search button event: grab input from each box, performs search operation, pushes results to array of saved cities, clears out divs
  $("#search-btn").click(function (e) {
    e.preventDefault();
    var city = $("#city-input").val();
    $("#city-input").val('');
    if (searchHistory.indexOf(city) !== -1) {
      getWeather(city);
      
    } else if (searchHistory.length < 8) {
      searchHistory.push(city);
      getWeather(city);
      
    } else {
      searchHistory.shift();
      searchHistory.push(city);
      getWeather(city);
      
    }
    localStorage.setItem("searchHistory", searchHistory);
  });
  
//   function for searching recently searched city
  $(".historyBtn").click(function (e) {
  getWeather($(this).text())

  });
  
 

  
  
  // when user saves 8 cities, oldest city gets kicked off list and newest city gets put on list first
  
  // UV Index values 0-3 is green, 3-5 is yellow moderate, 6-7 is orange high, 8-10 is red very high, 11+ is violet extreme
  
  // display values
  
  // Uppercase and lowercase are treated differently for adding into the array
  
  // add button when user clicks search button if there are no identical values

