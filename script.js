// api key 3a40bf9c7760e0838221c467c64d1d49

// Search button event: grab input from each box, performs search operation, clears out divs
$("#search-btn").click(function () {
    var searchTerm = $("#search-term").val
    
    var yourkey = "3a40bf9c7760e0838221c467c64d1d49";
    var queryURL = "" + yourkey;
    $.ajax({
        url: queryURL,
        method: 'GET'


    }).then(function (res) {
        $("#").attr()
        console.log(res);
a 

    })
})
// Clear button- clear results

$("#clear-btn").click(function () {
    $("#results").empty()
})