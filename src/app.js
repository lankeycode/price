// Déclaration constantes
const containerLevel = document.querySelector('.container')
const hintContainer = document.querySelector('.hintContainer')
const helpContainer = document.querySelector('.helpContainer')
const hotResult = document.querySelector('.thermHot')
const coldResult = document.querySelector('.thermCold')

// Déclaration variables
let h2 = document.getElementsByTagName('h2')[0]
let start = document.getElementById('start')
let msec = 0
let sec = 0
let min = 0
let hrs = 0
let t;
let level1 = document.querySelector('.level1')
let level2 = document.querySelector('.level2')
let level3 = document.querySelector('.level3')
let inputNumber = document.querySelector('input[name="number"]')
let number;
let result;

// init()
// Declaration fonction nombre alétoire
function chooseLevel(min, max) {

    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// fonction chronomètre
function chrono() {
    msec++
    if (msec >= -100) {
        msec = 0
        sec++
        if (sec >= 60) {
            sec = 0
            min++
            if (min >= 60) {
                min = 0
                hrs++

            }
        }
    }
}

function add() {
    chrono()
    h2.textContent = (hrs > 9 ? hrs : "0" + hrs)
        + ":" + (min > 9 ? min : "0" + min)
        + ":" + (sec > 9 ? sec : "0" + sec)
        + ":" + (msec > 9 ? msec : "0" + msec)
    timer()
}

function timer() {
    t = setTimeout(add, 1000)
}

start.addEventListener('click', () => {
    timer()
    containerLevel.classList.add('activeLevel')
})

// choisir le niveau 1
level1.addEventListener('click', () => {
    level1.textContent = "1 - 50"
    level1.classList.add('active')
    level2.classList.remove('active')
    level2.textContent = "Niveau 2"
    level3.classList.remove('active')
    level3.textContent = "Niveau 3"
    result = chooseLevel(1, 50)
    getNumber(5, 5)
    console.log(result)
})

// choisir le niveau 2
level2.addEventListener('click', () => {
    level2.textContent = "1 - 1000"
    level2.classList.add('active')
    level1.classList.remove('active')
    level1.textContent = "Niveau 1"
    level3.classList.remove('active')
    level3.textContent = "Niveau3"
    result = chooseLevel(1, 1000)
    getNumber(15, 15)
    console.log(result)
})

// choisir le niveau 3
level3.addEventListener('click', () => {
    level3.textContent = "1 - 50000"
    level3.classList.add('active')
    level1.classList.remove('active')
    level1.textContent = "Niveau 1"
    level2.classList.remove('active')
    level2.textContent = "Niveau 2"
    result = chooseLevel(1, 50000)
    getNumber(100, 100)
    console.log(result)
})

// fonction aide joueur
function getNumber(cold, hot) {
    let resultHot = result + hot
    let resultCold = result - cold
    go.addEventListener('click', () => {
        inputNumber = document.querySelector('input[name="number"]').value
        // aide joueur
        if (inputNumber < result) {
            hintContainer.textContent = "c'est plus"

        } else if (inputNumber > result) {
            hintContainer.textContent = "c'est moins"
            // fin du jeu
        } else {
            hintContainer.textContent = "vous avez gagné"
            clearTimeout(t)
        }

        // aide joueur animation
        if (inputNumber > resultCold && inputNumber < resultHot && inputNumber != result) {
            helpContainer.textContent = "Ouh la c'est chaud"
            hotResult.classList.add('activeHot')
            coldResult.classList.remove('activeCold')
        } else if (inputNumber < resultCold || inputNumber > resultHot) {
            helpContainer.textContent = "Hi Hi c'est froid"
            coldResult.classList.add('activeCold')
            hotResult.classList.remove('activeHot')

        } else if (inputNumber == result) {
            helpContainer.textContent = ''
            coldResult.classList.remove('activeCold')
            hotResult.classList.remove('activeHot')

        }
        return result - cold && result + hot
    })
}

//fonction reset
function init() {
    level1.textContent = "niveau 1"
    level2.textContent = "niveau 2"
    level3.textContent = "niveau 3"
    level1.classList.remove('active')
    level2.classList.remove('active')
    level3.classList.remove('active')
    hintContainer.textContent = ''
    helpContainer.textContent = ''
    coldResult.classList.remove('activeCold')
    hotResult.classList.remove('activeHot')
    result = 0
    document.getElementById('number').value = ''
    h2.textContent = "00:00:00:00"
    clearTimeout(t)
    containerLevel.classList.remove('activeLevel')
}

// reset
reset.addEventListener('click', () => {

    init()
})


