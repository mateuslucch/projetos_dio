
const startButton = document.getElementById("inicio");

function start() {

    $("#inicio").hide();

    let backgroundCssId = $("#fundoGame");

    //background layers
    $(backgroundCssId.selector).append("<div id='layer1' ></div>");
    $(backgroundCssId.selector).append("<div id='layer2' ></div>");
    $(backgroundCssId.selector).append("<div id='layer3' ></div>");
    $(backgroundCssId.selector).append("<div id='layer4' ></div>");
    $(backgroundCssId.selector).append("<div id='layer5' ></div>");
    $(backgroundCssId.selector).append("<div id='layer6' ></div>");
    $(backgroundCssId.selector).append("<div id='layer7' ></div>");
    $(backgroundCssId.selector).append("<div id='layer8' ></div>");
    $(backgroundCssId.selector).append("<div id='layer9' ></div>");


    $(backgroundCssId.selector).append("<div id='jogador'></div>");
    $(backgroundCssId.selector).append("<div id='inimigo1'></div>");
    $(backgroundCssId.selector).append("<div id='inimigo2' class='tankMove'></div>");
    $(backgroundCssId.selector).append("<div id='friendlyUnit' class='soldierWalk'></div>");
    $(backgroundCssId.selector).append("<div id='score'></div>");
    $(backgroundCssId.selector).append("<div id='lifes'></div>");

    var jogo = {};
    var fimdejogo = false;
    var totalPontos = 0;
    var salvos = 0;
    var perdidos = 0;
    var canShoot = true;    
    var posicaoY = parseInt(Math.random() * 334);
    var tecla = {
        W: 87,
        S: 83,
        D: 68
    }
    
    jogo.pressionou = [];

    var shootSound = document.getElementById("somDisparo");
    var explosionSound = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");

    // vidas, baseada no numero de sprites de energia - 1 (caixa vazia)
    let energyImages = [
        "url(assets/imgs/energia0.png)",
        "url(assets/imgs/energia1.png)",
        "url(assets/imgs/energia2.png)",
        "url(assets/imgs/energia3.png)"];
    let totalPlayerLifes = energyImages.length - 1;

    let screenSize = {
        maxWidth: parseInt($(backgroundCssId.selector).css('width')),
        minWidth: 0,
        maxHeigth: parseInt($(backgroundCssId.selector).css('height')),
        minHeight: 0
    }

    // characters
    let player = new Character();
    player._cssId = $("#jogador");
    player.speed = 20;
    player.life = totalPlayerLifes;
    let playerMaxVerticalOffset = 50;
    let playerMinVerticalOffset = 15;

    let enemy1 = new Character();
    enemy1._cssId = $("#inimigo1");
    enemy1.speed = 5;

    let enemy2 = new Character();
    enemy2._cssId = $("#inimigo2");
    enemy2.speed = 3;

    let friendlyChar = new Character();
    friendlyChar._cssId = $("#friendlyUnit");
    friendlyChar.speed = 1;

    // CSS ids
    let lifeBarCssId = $("#lifes");
    let projectile = $("#disparo");

    $(lifeBarCssId.selector).css("background-image", energyImages[totalPlayerLifes]);

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

        moveBackground();
        playerController();
        moveEnemy1();
        moveEnemy2();
        moveFriendlyUnit();
        checkCollision();
    }

    function moveBackground() {

        $("#layer1").css("background-position", moveLeft($("#layer1")) - 1);
        $("#layer2").css("background-position", moveLeft($("#layer2")) - 2);
        $("#layer3").css("background-position", moveLeft($("#layer3")) - 3);
        $("#layer4").css("background-position", moveLeft($("#layer4")) - 4);
        $("#layer5").css("background-position", moveLeft($("#layer5")) - 4);
        $("#layer6").css("background-position", moveLeft($("#layer6")) - 4);
        $("#layer7").css("background-position", moveLeft($("#layer7")) - 4);
        $("#layer8").css("background-position", moveLeft($("#layer8")) - 4);
        $("#layer9").css("background-position", moveLeft($("#layer9")) - 4);

        function moveLeft(layer) {
            return parseInt($(layer.selector).css("background-position"));
        }
    }

    function playerController() {

        if (jogo.pressionou[tecla.W]) {
            let direction = -1;
            movePlayer(direction);
            $(player._cssId.selector).css("background-image", "url(assets/imgs/plane_up.png)");
        }

        else if (jogo.pressionou[tecla.S]) {
            let direction = 1;
            movePlayer(direction);
            $(player._cssId.selector).css("background-image", "url(assets/imgs/plane_down.png)");
        }
        else { $(player._cssId.selector).css("background-image", "url(assets/imgs/plane.png)"); }

        if (jogo.pressionou[tecla.D]) { shoot(); }

    }

    function movePlayer(direction) {
        let playerPosition = parseInt($(player._cssId.selector).css("top"));
        //limite tela
        if (playerPosition <= screenSize.minHeight + playerMinVerticalOffset) {
            $(player._cssId.selector).css("top", playerPosition + player.speed);
        } else if (playerPosition >= screenSize.maxHeigth - player.imageHeight - playerMaxVerticalOffset) {
            $(player._cssId.selector).css("top", playerPosition - player.speed);
        } else {
            // move se condições anteriores falharem
            $(player._cssId.selector).css("top", playerPosition + direction * player.speed);
        }

    }

    function moveEnemy1() {

        posicaoX = parseInt($(enemy1._cssId).css("left"));
        $(enemy1._cssId.selector).css("left", posicaoX - enemy1.speed);
        $(enemy1._cssId.selector).css("top", posicaoY);

        if (posicaoX <= screenSize.minWidth) {
            posicaoY = parseInt(Math.random() * 334);
            $(enemy1._cssId.selector).css("left", screenSize.maxWidth - enemy1.imageWidth);
            $(enemy1._cssId.selector).css("top", posicaoY);
        }
    }

    function moveEnemy2() {

        posicaoX = parseInt($(enemy2._cssId.selector).css("left"));
        $(enemy2._cssId.selector).css("left", posicaoX - enemy2.speed);

        if (posicaoX <= screenSize.minWidth) {
            $(enemy2._cssId.selector).css("left", screenSize.maxWidth - enemy2.imageWidth);
        }
    }

    function moveFriendlyUnit() {

        posicaoX = parseInt($(friendlyChar._cssId.selector).css("left"));
        $(friendlyChar._cssId.selector).css("left", posicaoX + friendlyChar.speed);

        if (posicaoX > screenSize.maxWidth) {
            $(friendlyChar._cssId.selector).css("left", screenSize.minWidth);
        }
    }

    function shoot() {

        if (canShoot == true) {

            shootSound.play();
            canShoot = false;

            let topo = parseInt(player.cssId.css("top")); // posição player
            let posicaoX = parseInt(player.cssId.css("left"));
            let tiroX = posicaoX + player.imageWidth;
            let topoTiro = topo + player.imageHeight / 2;
            $("#fundoGame").append("<div id='disparo'></div>");
            $(projectile.selector).css("top", topoTiro);
            $(projectile.selector).css("left", tiroX);

            var tempoDisparo = window.setInterval(executeShoot, 1);
        }

        function executeShoot() {
            let posX = parseInt($(projectile.selector).css("left"));
            $(projectile.selector).css("left", posX + 3);
            if (posX > screenSize.maxWidth) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;

                $(projectile.selector).remove();
                canShoot = true;
            }

        }

    }

    function checkCollision() {
        var collision1 = $(player._cssId.selector).collision($(enemy1._cssId));  // collision é do jquery
        var collision2 = $(player._cssId.selector).collision($(enemy2._cssId.selector));
        var collision3 = $(projectile.selector).collision($(enemy1._cssId.selector));
        var collision4 = $(projectile.selector).collision($(enemy2._cssId.selector));
        var collision5 = $(player._cssId.selector).collision($(friendlyChar._cssId.selector));
        var collision6 = $(enemy2._cssId.selector).collision($(friendlyChar._cssId.selector));

        if (collision1.length > 0) { // indica que houve colisão
            
            playerDamage();
            inimigo1X = parseInt($(enemy1._cssId.selector).css("left"));
            inimigo1Y = parseInt($(enemy1._cssId.selector).css("top"));
            planeExplosion(inimigo1X, inimigo1Y);

            $(enemy1._cssId.selector).remove();

            reposicionaInimigo1();
            
        }

        if (collision2.length > 0) {

            playerDamage();
            inimigo2X = parseInt($(enemy2._cssId.selector).css("left"));
            inimigo2Y = parseInt($(enemy2._cssId.selector).css("top"));
            tankExplosion(inimigo2X, inimigo2Y);

            $(enemy2._cssId.selector).remove();

            reposicionaInimigo2();
        }

        if (collision3.length > 0) {
            
            enemy1.speed += 1;
            scoreHandler(100)
            inimigo1X = parseInt($(enemy1._cssId.selector).css("left"));
            inimigo1Y = parseInt($(enemy1._cssId.selector).css("top"));

            planeExplosion(inimigo1X, inimigo1Y);

            $(enemy1._cssId.selector).remove();

            reposicionaInimigo1();
            $(projectile.selector).css("left", screenSize.maxWidth);

        }

        if (collision4.length > 0) {

            enemy2.speed += 0.2;
            scoreHandler(50);
            inimigo2X = parseInt($(enemy2._cssId.selector).css("left"));
            inimigo2Y = parseInt($(enemy2._cssId.selector).css("top"));
            $(enemy2._cssId.selector).remove();

            tankExplosion(inimigo2X, inimigo2Y);
            $(projectile.selector).css("left", screenSize.maxWidth);

            reposicionaInimigo2();
        }

        if (collision5.length > 0) {

            somResgate.play();
            salvos++;
            updateUi();
            reposicionaAmigo();
            $(friendlyChar._cssId.selector).remove();
        }

        if (collision6.length > 0) {

            perdidos++;
            updateUi();
            amigoX = parseInt($(friendlyChar._cssId.selector).css("left"));
            amigoY = parseInt($(friendlyChar._cssId.selector).css("top"));
            explosao3(amigoX, amigoY);
            $(friendlyChar._cssId.selector).remove();

            reposicionaAmigo();
        }

    }

    function planeExplosion(inimigo1X, inimigo1Y) {
        explosionSound.play();
        $("#fundoGame").append("<div id='planeExplosion' class='planeExplosion'></div>");

        $("#planeExplosion").css("top", inimigo1Y);
        $("#planeExplosion").css("left", inimigo1X);

        var tempoExplosao = window.setInterval(removeExplosion, 500);

        function removeExplosion() {
            $("#planeExplosion").remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }

    function tankExplosion(inimigo2X, inimigo2Y) {
        explosionSound.play();
        $("#fundoGame").append("<div id='tankExplosion' class='tankExplosion'></div>");

        $("#tankExplosion").css("top", inimigo2Y);
        $("#tankExplosion").css("left", inimigo2X);

        var tempoExplosao2 = window.setInterval(removeExplosion2, 2000);

        function removeExplosion2() {
            $("#tankExplosion").remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    }

    function explosao3(amigoX, amigoY) {
        somPerdido.play();
        $("#fundoGame").append("<div id='explosao3' class=soldierDead></div>");

        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);

        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);

        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;
        }
    }

    function reposicionaInimigo1() {
        
        var tempoColisao4 = window.setInterval(reposiciona1, 1);
        function reposiciona1() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimdejogo == false) {
                $(backgroundCssId.selector).append("<div id='inimigo1'></div>");
                posicaoY = parseInt(Math.random() * 334);
                enemy1.cssId = $("#inimigo1");
                $(enemy1._cssId.selector).css("left", screenSize.maxWidth - enemy1.imageWidth);
                $(enemy1._cssId.selector).css("top", posicaoY);
            }
        }
        playerCollided = false;
    }

    function reposicionaInimigo2() {

        var tempoColisao4 = window.setInterval(reposiciona2, 5000);

        function reposiciona2() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;

            if (fimdejogo == false) {
                $(backgroundCssId.selector).append("<div id='inimigo2' class='tankMove'></div>");
            }
        }
        playerCollided = false;
    }

    function reposicionaAmigo() {

        var tempoAmigo = window.setInterval(reposiciona6, 6000);

        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;

            if (fimdejogo == false) {
                $(backgroundCssId.selector).append("<div id='friendlyUnit' class='soldierWalk'></div>");
            }
        }
    }

    function scoreHandler(pontos) {
        totalPontos += pontos;
        updateUi();
    }

    function updateUi() {
        $("#score").html("<h2> Pontos: " + totalPontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
    }

    function playerDamage() {
        totalPlayerLifes--;
        $(lifeBarCssId.selector).css("background-image", energyImages[totalPlayerLifes]);
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

        $(backgroundCssId.selector).append("<div id='fim'></div>");

        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + totalPontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
    }

    function removeImages() {
        player.cssId.remove();
        enemy1._cssId.remove();
        $(enemy2._cssId.selector).remove();
        $(friendlyChar._cssId.selector).remove();
        removeLayers()
    }
    function removeLayers()
    {
        $("#layer1").remove();
        $("#layer2").remove();
        $("#layer3").remove();
        $("#layer4").remove();
        $("#layer5").remove();
        $("#layer6").remove();
        $("#layer7").remove();
        $("#layer8").remove();
        $("#layer9").remove();        
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

    get imageWidth() { return parseInt($(this._cssId.selector).css('width')); }

    get imageHeight() { return parseInt($(this._cssId.selector).css('height')); }


}

// dimensoes originais de imagens, pode ser util!!
/*
function getOriginalImageSize() {
    var image_url = $('#jogador').css('background-image'),
        image;
    //
    // Remove url() or in case of Chrome url("")
    image_url = image_url.match(/^url\("?(.+?)"?\)$/);

    if (image_url[1]) {
        image_url = image_url[1];
        image = new Image();

        // just in case it is not already loaded
        $(image).load(function () {
            //alert(image.width + 'x' + image.height);
            console.log(image.width);
        });

        image.src = image_url;
    }
    //}
*/
