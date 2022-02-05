$('.owl-carousel').owlCarousel({
    loop: false, // true or false
    margin: 10, // distancia entre imagens/objetos/o que for
    nav: false, // setas navegação true or false
    responsive: {
        0: {     // numero de pixels
            items: 2 // numero maximo de items para o numero de pixels
        },
        600: {
            items: 3
        },
        1000: {
            items: 7
        }
    }
})