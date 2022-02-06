$('.owl-carousel').owlCarousel({
    loop: false, // true or false
    margin: 10, // distancia entre imagens/objetos/o que for
    nav: false, // setas navegação true or false
    responsive: {
        0: {     // numero de pixels
            items: 1 // numero maximo de items para o numero de pixels
        },
        400: {
            items: 2
        },
        600: {
            items: 3
        },
        800: {
            items: 4
        },
        1000: {
            items: 6
        },
        1200: {
            items: 7
        }
    }
})