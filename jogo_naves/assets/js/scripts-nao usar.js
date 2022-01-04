
const startButton = document.getElementById("inicio");

function start() {

    $("#inicio").hide();

    let backgroundCssId = $("#fundoGame");

    backgroundCssId.append("<div id='jogador' class='anima1'></div>"); //class anima1 anima jogador
    backgroundCssId.append("<div id='inimigo1' class='anima2'></div>");
    backgroundCssId.append("<div id='inimigo2' ></div>");
    backgroundCssId.append("<div id='amigo' class='anima3'></div>");
    backgroundCssId.append("<div id='placar'></div>");
    backgroundCssId.append("<div id='energia'></div>");

    var jogo = {};
    var fimdejogo = false;
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var podeAtirar = true;
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334);
    var tecla = {
        W: 87,
        S: 83,
        D: 68
    }
    let totalPontos = 0;

    jogo.pressionou = [];

    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");

    // vidas, baseada no numero de sprites de energia-1
    let energyImages = [
        "url(assets/imgs/energia0.png)",
        "url(assets/imgs/energia1.png)",
        "url(assets/imgs/energia2.png)",
        "url(assets/imgs/energia3.png)"];
    let totalPlayerLifes = energyImages.length - 1;    

    let screenSize = {
        maxWidth: 950,
        minWidth: 0,
        maxHeigth: 630,
        minHeight: 0
    }

    // characters
    let player = new Character();
    player._cssId = $("#jogador");
    player.speed = 20;
    player.life = totalPlayerLifes;

    let enemy1 = new Character();
    enemy1._cssId = $("#inimigo1");
    enemy1.speed = 10;

    let enemy2 = new Character();
    enemy2._cssId = $("#inimigo2");
    enemy2.speed = 3;

    let friendlyChar = new Character();
    friendlyChar._cssId = $("#amigo");
    friendlyChar.speed = 1;

    // CSS ids
    let energyCssId = $("#energia");
    let projectile = $("#disparo");

    energyCssId.css("background-image", energyImages[totalPlayerLifes]);    
    musica.addEventListener("ended", function () { musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true
    });

    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false
    });

    jogo.timer = setInterval(loop, 30); // chamar loop a cada 30ms
    updateUi();

    function loop() {

        moveFundo();
        playerController();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        colisao();
    }

    function moveFundo() {

        let esquerda = parseInt(backgroundCssId.css("background-position"));
        backgroundCssId.css("background-position", esquerda - 1);
    }

    function playerController() {

        if (jogo.pressionou[tecla.W]) {
            let direction = -1;
            movePlayer(direction);
        }

        if (jogo.pressionou[tecla.S]) {
            let direction = 1;
            movePlayer(direction);
        }

        if (jogo.pressionou[tecla.D]) { disparo(); }

    }

    function movePlayer(direction) {
        let playerPosition = parseInt(player._cssId.css("top"));

        //limite tela
        if (playerPosition <= 10) {
            player._cssId.css("top", playerPosition + player.speed);
        } else if (playerPosition >= screenSize.maxHeigth) {
            player._cssId.css("top", playerPosition - player.speed);
        } else {
            // move se condições anteriores falharem            
            player._cssId.css("top", playerPosition + direction * player.speed);
        }

    }

    function moveinimigo1() {  // helicoptero

        let posicaoX = parseInt(enemy1._cssId.css("left"));

        moveChar(enemy1._cssId, "left", posicaoX, posicaoY, -5);
        enemy1._cssId.css("top", posicaoY);

        if (posicaoX <= screenSize.minWidth) {
            posicaoY = parseInt(Math.random() * 334);
            moveChar(enemy1._cssId, "left", screenSize.maxWidth, posicaoY, -5);
            enemy1._cssId.css("top", posicaoY);
        }
        
    }

    function moveinimigo2() {  // caminhao

        let posicaoX = parseInt($("#inimigo2").css("left"));
        moveChar($("#inimigo2"), "left", posicaoX, 0, -3);

        if (posicaoX <= screenSize.minWidth) {
            moveChar($("#inimigo2"), "left", screenSize.maxWidth, 0, -3);
        }
      
    }

    function moveamigo() {

        let posicaoX = parseInt($("#amigo").css("left"));
        moveChar($("#amigo"), "left", posicaoX, 0, 1);
        // reposiciona quando atinge final tela
        if (posicaoX > screenSize.maxWidth) { moveChar($("#amigo"), "left", screenSize.minWidth, 0, 1); }
        
    }

    function moveChar(objectId, cssSide, posX, posY, speed) {
        objectId.css(cssSide, posX + speed, posY + speed);
    }

    function disparo() {

        if (podeAtirar == true) {

            somDisparo.play();
            podeAtirar = false;

            let topo = parseInt(player.cssId.css("top")); // posição player
            let posicaoX = parseInt(player.cssId.css("left"));
            let tiroX = posicaoX + 190;
            let topoTiro = topo + 37;
            $("#fundoGame").append("<div id='disparo'></div>");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);            
            var tempoDisparo = window.setInterval(executaDisparo, 1);            
        }

        function executaDisparo() {
            let posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 1);

            if (posicaoX > 900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                
                $("#disparo").remove();
                podeAtirar = true;                
            }

        }

    }

    function colisao() {
        var colisao1 = (player.cssId.collision(enemy1._cssId));  // collision é do jquery
        var colisao2 = (player.cssId.collision(enemy2._cssId));
        var colisao3 = ($("#disparo").collision(enemy1._cssId));
        var colisao4 = ($("#disparo").collision(enemy2._cssId));
        var colisao5 = (player.cssId.collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));

        if (colisao1.length > 0) { //length > 0 indica que houve colisão

            playerDamage();
            inimigo1X = parseInt(enemy1._cssId.css("left"));
            inimigo1Y = parseInt(enemy1._cssId.css("top"));
            explosao1(inimigo1X, inimigo1Y);

            let posy = parseInt(Math.random() * 334);
            enemy1._cssId.css("left", 694);
            enemy1._cssId.css("top", posy);
        }

        if (colisao2.length > 0) {

            playerDamage();
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);

            $("#inimigo2").remove();

            reposicionaInimigo2();
        }

        if (colisao3.length > 0) {

            velocidade = velocidade + 0.1;
            scoreHandler(100);
            inimigo1X = parseInt(enemy1._cssId.css("left"));
            inimigo1Y = parseInt(enemy1._cssId.css("top"));

            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);
            // reposiciona inimigo 1
            posy = parseInt(Math.random() * 334);
            enemy1._cssId.css("left", 694);
            enemy1._cssId.css("top", posy);
        }

        if (colisao4.length > 0) {

            scoreHandler(50);
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosao2(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);

            reposicionaInimigo2();
        }

        if (colisao5.length > 0) {

            somResgate.play();
            salvos++;
            reposicionaAmigo();
            $("#amigo").remove();
        }

        if (colisao6.length > 0) {

            perdidos++;
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX, amigoY);
            $("#amigo").remove();

            reposicionaAmigo();
        }

    }

    function explosao1(inimigo1X, inimigo1Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div>");
        $("#explosao1").css("background-image", "url(assets/imgs/explosao.png");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000); //1000ms

        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }

    function explosao2(inimigo2X, inimigo2Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao2'></div>");
        $("#explosao2").css("background-image", "url(assets/imgs/explosao.png");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({ width: 200, opacity: 0 }, "slow");

        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    }

    function explosao3(amigoX, amigoY) {
        somPerdido.play();
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div>");
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);

        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);

        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;
        }
    }

    function reposicionaInimigo2() {

        var tempoColisao4 = window.setInterval(reposiciona4, 5000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimdejogo == false) {
                backgroundCssId.append("<div id='inimigo2'></div>");
            }
        }
    }

    function reposicionaAmigo() {

        var tempoAmigo = window.setInterval(reposiciona6, 6000);

        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;

            if (fimdejogo == false) {
                backgroundCssId.append("<div id='amigo' class='anima3'></div>");
            }
        }
    }

    function scoreHandler(pontos) {
        totalPontos += pontos;
        updateUi();
    }

    function updateUi() {
        $("#placar").html("<h2> Pontos: " + totalPontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
    }

    function playerDamage() {
        totalPlayerLifes--;
        energyCssId.css("background-image", energyImages[totalPlayerLifes]);
        if (totalPlayerLifes == 0) {
            gameOver();
        }
    }

    function gameOver() {
        fimdejogo = true;
        musica.pause();
        somGameover.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        removeImages();

        backgroundCssId.append("<div id='fim'></div>");

        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
    }

    function removeImages() {
        player.cssId.remove();
        enemy1._cssId.remove();
        $("#inimigo2").remove();
        $("#amigo").remove();
    }
}

function reiniciaJogo() {
    playerLifes = 3;
    somGameover.pause();
    $("#fim").remove();
    start();

}

class Character {

    constructor(life, cssId, speed) {
        this._life = life;
        this._cssId = cssId;
        this._speed = speed;
    }

    get life() { return this._life; }

    set life(value) { this._life = value; }

    get cssId() { return this._cssId; }

    set cssId(cssIdValue) { this._cssId = cssIdValue; }

    get speed() { return this._speed; }

    set speed(speed) { this._speed = speed; }
}
