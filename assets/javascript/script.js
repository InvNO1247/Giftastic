// function to start once the page loads
$(function () {
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    console.log("Page Loaded");
})


// my array
var searchArray = ["Friends", "The Office", "How I met your mother", "Gilmore Girls", "New Girl", "Parks and Recreation", "Firefly", "supernatural", "Game of Thrones"];

// function to add buttons to page after submitting input in the search area
function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < searchArray.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}
// when the submit button is clicked, an ajax call is made to the giphy API
$(document).on('click', '.searchButton', function () {
    $('#searches').empty();
    var type = $(this).data('type');
    var searchInput = $("#search-input").val();
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=73uzkM5m0FgyFBOtoLeNBsgYv7Qzuokf&limit=10';
    $.ajax({
        url: queryURL,
        method: 'GET',
    })
        // the AJAX response is logged with the rating, still and animated image tags, and the image and rating is uploaded on the html page
        .done(function (response) {
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $("<p>").text('Rating: ' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                // append the rating and image to the page
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }

        })
})
// This function lets the image click back and forth between still and animated 
$(document).on('click', '.searchImage', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})
// This function popluates a button for the newly searched tv show
$('#addSearch').on('click', function () {
    var newSearch = $('input').eq(0).val();
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    return false;
})
