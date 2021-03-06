

/*
2C = 2 DE TREBOLES
2D = 2 DE DIAMANTES
2H = 2 DE CORAZONES
2S = 2 DE ESPADAS
 */


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0
puntosComputador = 0


// referencias del html
const btnNuevo = document.querySelector('#btnNuevo')
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')
const divCartasJugador = document.querySelector('#jugador-cartas')
const puntosHTML = document.querySelectorAll('small')
const divCartasComputador = document.querySelector('#computador-cartas')

//esta funcion crea una nueva baraja
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);

        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck)
    console.log(deck);
    return deck;
}

crearDeck()

//esta funcion permite tomar una carta

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck'
    }
    const carta = deck.pop();
    // console.log(deck);
    // console.log(carta);
    return carta
}
// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1)

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1



    // let puntos = 0
    // if (isNaN(valor)) {
    //     puntos = (valor === 'A') ? 11 : 10
    // } else {
    //     puntos = valor * 1
    // }
    // console.log(puntos);
}
const valor = valorCarta(pedirCarta())
// console.log({ valor });


/*  TURNO DEL COMPUTADOR */
const turnoComputador = (puntosMinimos) => {
    do {
        const carta = pedirCarta()

        puntosComputador = puntosComputador + valorCarta(carta)
        puntosHTML[1].innerText = puntosComputador


        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`/*hago el llamado de la carta de manera dinamica*/
        imgCarta.classList.add('carta')/*esto permite a??adir la clase de la carta que se hizo en el css*/
        divCartasComputador.append(imgCarta)

        if (puntosMinimos > 21) {
            break
        }

    } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));
    setTimeout(() => {
        if (puntosComputador === puntosMinimos) {
            alert('Nadie gana')
        } else if (puntosMinimos > 21) {
            alert('El bot gano!')
        } else if (puntosComputador > 21) {
            alert('Jugador gana')
        } else {
            alert('Bot gana!')
        }

    }, 10);
}

// EVENTOS

// A ESTA FUNCION SE LE LLAMA CALLBACK PORQUE ESTA DENTRO DE OTRA FUNCION COMO ARGUMENTO
btnPedir.addEventListener('click', () => {
    // aqui lo que le decimos a js es que en cuando se le click al boton BTNPEDIR se dispara la funcion de flecha osea lo que esta dentro de aqui
    const carta = pedirCarta()

    puntosJugador = puntosJugador + valorCarta(carta)
    console.log(puntosJugador);
    puntosHTML[0].innerText = puntosJugador

    // <!-- <img class="carta" src="assets/cartas/10D.png" alt="" srcset=""> -->
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`/*hago el llamado de la carta de manera dinamica*/
    imgCarta.classList.add('carta')/*esto permite a??adir la clase de la carta que se hizo en el css*/
    divCartasJugador.append(imgCarta)

    if (puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true
        btnDetener.disabled = true
        // aqui llamo la funcion del computador jugando y le paso como argumento los puntos del jugador
        turnoComputador(puntosJugador)
    } else if (puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputador(puntosJugador)
    }
})
btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true
    btnPedir.disabled = true
    turnoComputador(puntosJugador)
})

btnNuevo.addEventListener('click', () => {
    console.clear()
    deck = []
    deck = crearDeck()

    puntosJugador = 0
    puntosComputador = 0

    puntosHTML[0].innerText = 0
    puntosHTML[1].innerText = 0

    divCartasComputador.innerHTML = ''
    divCartasJugador.innerHTML = ''
    btnPedir.disabled = false
    btnDetener.disabled = false
})


// // TODO: BORRAR
// console.log(16);
// turnoComputador(16)