let mainElement = document.getElementById("main");
let playerBox

function backMainMenu() {
    window.location.href = 'index.html';
}

// mount player box
function appendPlayer() {
    playerBox = document.createElement("iframe");
    playerBox.src = movieUrl;
    playerBox.className = "player-box";
    playerBox.width = "640";
    playerBox.height = "480";
    playerBox.frameborder = "0";
    playerBox.setAttribute('webkitallowfullscreen', 'true');
    playerBox.setAttribute('allowFullscreen', 'true');
    playerBox.setAttribute('mozallowfullscreen', 'true');    
    mainElement.appendChild(playerBox);
}

let movieUrl = localStorage["movie-url"];

const backMenu = document.getElementById("back-menu");

appendPlayer();

backMenu.addEventListener('click', backMainMenu);


/*
video player tag standart from internet archive:

<iframe 
src="https://archive.org/embed/silent-baron-munchausens-dream&autoplay=1" 
width="640" 
height="480" 
frameborder="0" 
webkitallowfullscreen="true" 
mozallowfullscreen="true" 
allowfullscreen></iframe>

archiuve video link model:
https://archive.org/embed/name movie
*/
