if (localStorage.getItem("searchHistory")) {
  var searchHistory = localStorage.getItem("searchHistory").split(",");
  console.log(searchHistory);
  for (let i = 0; i < searchHistory.length; i++) {
      var recentSearches = $("#recent-searches")
      var newBtn = $("<button class='historyBtn'>").text(searchHistory[i])
      recentSearches.append(newBtn)
  }
}
else{
    var searchHistory = []
}
//

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
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      yourKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  });
}

// Search button event: grab input from each box, performs search operation, clears out divs
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

$(".historyBtn").click(function (e) {
getWeather($(this).text())
});

// get lat and long for city and create function for One call api
// create same function for clicking on saved city

// when user saves 8 cities, oldest city gets kicked off list and newest city gets put on list first

// UV Index values 0-3 is green, 3-5 is yellow moderate, 6-7 is orange high, 8-10 is red very high, 11+ is violet extreme
