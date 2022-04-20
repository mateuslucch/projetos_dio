let jogador = null;
let fimJogo = false;

let jogadorSelecionado = document.getElementById('jogador-selecionado');
let quadrados = document.getElementsByClassName('quadrado');
let vencedorSelecionado = document.getElementById('vencedor-selecionado');

let quadrado1 = document.getElementById(1);
let quadrado2 = document.getElementById(2);
let quadrado3 = document.getElementById(3);
let quadrado4 = document.getElementById(4);
let quadrado5 = document.getElementById(5);
let quadrado6 = document.getElementById(6);
let quadrado7 = document.getElementById(7);
let quadrado8 = document.getElementById(8);
let quadrado9 = document.getElementById(9);

mudarJogador("X");

function escolherQuadrado(id) {

    if (fimJogo === true) { return; }

    let quadrado = document.getElementById(id);

    if (quadrado.innerHTML !== "-") { return; }

    quadrado.innerHTML = jogador;
    quadrado.style.color = "#000";

    if (jogador === 'X') {
        jogador = 'O';
    } else {
        jogador = 'X';
    }
    mudarJogador(jogador);
    checaVencedor();

}

function mudarJogador(valor) {
    jogador = valor;
    jogadorSelecionado.innerHTML = jogador;
}

function checaVencedor() {

    // horizontal
    checagemSequencia(quadrado1, quadrado2, quadrado3);
    checagemSequencia(quadrado4, quadrado5, quadrado6);
    checagemSequencia(quadrado7, quadrado8, quadrado9);
    // vertical
    checagemSequencia(quadrado1, quadrado4, quadrado7);
    checagemSequencia(quadrado2, quadrado5, quadrado8);
    checagemSequencia(quadrado3, quadrado6, quadrado9);
    // diagonal
    checagemSequencia(quadrado1, quadrado5, quadrado9);
    checagemSequencia(quadrado7, quadrado5, quadrado3);

}

function checagemSequencia(quadrado1, quadrado2, quadrado3) {

    if (quadrado1.innerHTML != '-' && quadrado1.innerHTML === quadrado2.innerHTML && quadrado2.innerHTML === quadrado3.innerHTML) {
        fimJogo = true;
        mudaCorQuadrado(quadrado1, quadrado2, quadrado3);
        mudarVencedor(quadrado1);
    }
}

function mudaCorQuadrado(quadrado1, quadrado2, quadrado3) {
    quadrado1.style.backgroundColor = "#0f0";
    quadrado2.style.backgroundColor = "#0f0";
    quadrado3.style.backgroundColor = "#0f0";
}

function mudarVencedor(quadrado) {
    vencedor = quadrado.innerHTML;
    vencedorSelecionado.innerHTML = vencedor;
}

function reiniciarJogo() {

    fimJogo = false;

    vencedor = null;
    vencedorSelecionado.innerHTML = '';

    for (let i = 1; i <= 9; i++) {
        let quadrado = document.getElementById(i);
        quadrado.style.background = '#4682b4';
        quadrado.style.color = '#4682b4';
        quadrado.innerHTML = '-';
    }
}