
function getMovieData(urlString) {
    console.log(urlString);
    localStorage["movie-url"] = urlString;
}

function openPlayerPage() {
    window.location.href = 'player.html';
}

// check clicks on .item elements, save data, open player window
$(document).on("click", ".item", function (ev) {    
    if ($(this).attr('data-url') != "#") {
        getMovieData($(this).attr('data-url'));
        openPlayerPage();
    }
});