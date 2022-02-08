
function getMovieData(urlString, movieTitle) {    
    localStorage["movie-url"] = urlString;
    localStorage["movie-title"] = movieTitle;
}

function openPlayerPage() {
    window.location.href = 'player.html';
}

// check clicks on .item elements, save data, open player window
$(document).on("click", ".item", function (ev) {    
    if ($(this).attr('data-url') != "#") {
        getMovieData($(this).attr('data-url'), $(this).attr('data-movie-title'));
        openPlayerPage();
    }
});