const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

const jumpOffset = 20;
const jumpInterval = 20;
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (isJumping === false) {
            isJumping = true;
            jump();
        }
    }
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 200) {
            clearInterval(upInterval); // stop set interval
            let downInterval = setInterval(() => {
                position -= jumpOffset;
                if (position <= 0) {
                    clearInterval(downInterval);
                    position = 0;
                    isJumping = false;
                }
                dino.style.bottom = position + 'px';
            }, jumpInterval)
        } else {
            position += jumpOffset;
            dino.style.bottom = position + 'px';
        }

    }, jumpInterval); // codigo vai ser executado cada 20ms
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {

        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { // obs: 60 size of image
            //gameover
            //clearInterval(leftInterval);
            //document.body.innerHTML = '<h1 class = "game-over" > Fim de Jogo </h1>';
        } else {
            cactusPosition -= 2;
            cactus.style.left = cactusPosition + 'px';

        }
    }, 5);

    setTimeout(createCactus, randomTime);

}

createCactus();
document.addEventListener('keyup', handleKeyUp);