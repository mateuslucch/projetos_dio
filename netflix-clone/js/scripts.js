let popMoviesList = $("#pop-movies");
let popMovie = $(".item");

function getMovieData(classe) {
    console.log(classe);
    localStorage["movie-url"] = classe;
}

function openPlayerPage() {
    window.location.href = 'player.html';
}

$(document).on("click", ".item", function (ev) {
    getMovieData($(this).attr('data-url'));
    openPlayerPage();
});