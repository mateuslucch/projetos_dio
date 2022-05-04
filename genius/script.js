let scoreText = document.getElementById('score');
let statusText = document.getElementById('text-status');
let triesText = document.getElementById('tries');

// audio
let audio = [
    new Audio('./assets/sounds/Randomize1.wav'),
    new Audio('./assets/sounds/Randomize2.wav'),
    new Audio('./assets/sounds/Randomize3.wav'),
    new Audio('./assets/sounds/Randomize4.wav'),
];
// set audio volume
let audioVolume = 0.6;
for (i in audio) {
    audio[i].volume = audioVolume;
}
let muteAudio = false;
let muteButton = document.getElementById('mute-button');

class GeniusButton {
    constructor(color, sound) {
        this._color = color;
        this._sound = sound;
    }

    get color() { return this._color; }
    set color(colorQuery) { this._color = colorQuery; }

    get sound() { return this._sound; }
    set sound(clickSound) { this._sound = clickSound; }

    clickSound() { this._sound.play(); }

    changeColor(time) {
        setTimeout(() => {
            this._color.classList.add('selected');
            if (!muteAudio) {
                this._sound.play();
            }
        }, time);
        // time to change back
        setTimeout(() => {
            this._color.classList.remove('selected');
        }, time + 300);
    }
}

const blueButton = new GeniusButton();
blueButton._color = document.querySelector('.blue');
blueButton._sound = audio[0];

const redButton = new GeniusButton();
redButton._color = document.querySelector('.red');
redButton._sound = audio[1];

const greenButton = new GeniusButton();
greenButton._color = document.querySelector('.green');
greenButton._sound = audio[2];

const yellowButton = new GeniusButton();
yellowButton._color = document.querySelector('.yellow');
yellowButton._sound = audio[3];

const geniusBtnList = [
    blueButton,
    redButton,
    greenButton,
    yellowButton
]

let order = [];
let clickedOrder = [];
let score = 0;
let totalTries = 3;
let tries = totalTries;
let playerTurn = false;
let gameEnded = true;
let playOrderDelay = 400;

// called from start button
let playGame = () => {
    statusText.innerHTML = ('Jogo iniciado! Aguarde...');
    resetGame();
    startAnimation();
    gameEnded = false;
    setTimeout(() => {
        shuffleOrder();
    }, 2000)
}

// cria ordem aleatória
let shuffleOrder = () => {
    // sorteia um numero de 1 a tamanho da lista de botões
    let genBtnIndex = Math.floor(Math.random() * geniusBtnList.length);
    // atribui um dos objetos da lista, usando o numero sorteado (index)
    order[order.length] = geniusBtnList[genBtnIndex];
    // esvazia o array dos clicados   
    setInterval
    playOrder();
}

let playOrder = () => {
    clickedOrder = [];
    statusText.innerHTML = ('Escolhendo a ordem...');
    let totalTime = 0;
    for (let element in order) {
        order[element].changeColor(totalTime);
        totalTime += playOrderDelay;
    }
    if (totalTime === order.length * playOrderDelay) {
        setTimeout(() => {
            statusText.innerHTML = ('Clique na ordem...');
            totalTime = 0;
            playerTurn = true;
        }, totalTime)
    }
}

let startAnimation = () => {
    let totalTime = 0;
    for (let element in geniusBtnList) {
        geniusBtnList[element].changeColor(totalTime);
        totalTime += 200;
    }
    if (totalTime === geniusBtnList.length * playOrderDelay) {
        setTimeout(() => {
            totalTime = 0;

        }, totalTime)
    }
}

let playWrong = () => {
    for (let element in geniusBtnList) {
        geniusBtnList[element].changeColor(0);
    }
    // play again if tries != 0
    setTimeout(() => {
        playOrder();
    }, 2000)
}

// checa se os botoes clicados são os mesmos
let checkOrder = () => {
    for (let i in clickedOrder) {
        // mistakes path
        if (clickedOrder[i] != order[i]) {
            clickedOrder = [];
            playerTurn = false;
            tries--;
            triesText.innerHTML = `Tentativas: ${tries}`;
            if (tries == 0) {
                gameOverPath();
                break;
            } else {
                statusText.innerHTML = "Errado!"
                setTimeout(() => {
                    playWrong();
                }, 600)
            }
        }
    }
    // right choices
    if (clickedOrder.length == order.length) {
        clickedOrder = [];
        playerTurn = false;
        statusText.innerHTML = ('Muito Bem!');
        score++;
        if (score < 10) {
            scoreText.innerHTML = `Score: 0${score}`;
        } else { scoreText.innerHTML = `Score: ${score}`; }
        //console.log(`Pontualção: ${score}\n Você acertou! Iniciando próximo nível!`);
        setTimeout(() => {
            shuffleOrder();
        }, 2000);
    }
}

// função para o clique do usuário
let click = (element) => {
    if (!gameEnded && playerTurn == true) {
        clickedOrder[clickedOrder.length] = element;
        element.changeColor(0);
        checkOrder();
    }
}

let muteAudioButton = () => {
    if (muteAudio == false) {
        console.log('audio muted');
        muteButton.style.border = 'inset';
        muteAudio = true;
    } else {
        muteButton.style.border = 'outset';
        muteAudio = false;
    }
}

let gameOverPath = () => {
    gameEnded = true;
    statusText.innerHTML = `Você perdeu! \n Aperte start para começar de novo`;
    scoreText.innerHTML = `Max Score: ${score}`;
}

let startGame = () => {
    statusText.innerHTML = `Bem vindo ao Genius! \n Clique em start para começar!`;
}

let resetGame = () => {
    // reset all timeouts 
    resetTimeouts();
    playerTurn = false;
    order = [];
    clickedOrder = [];
    score = 00;
    scoreText.innerHTML = `Score: 0${score}`;
    tries = totalTries;
    triesText.innerHTML = `Tentativas: ${tries}`;
}

let resetTimeouts = () => {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
}

// eventos clique para as cores
greenButton._color.onclick = () => click(greenButton);
redButton._color.onclick = () => click(redButton);
yellowButton._color.onclick = () => click(yellowButton);
blueButton._color.onclick = () => click(blueButton);

// inicio jogo
startGame();