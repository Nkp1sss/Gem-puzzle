import { createElement, generateCells, deleteCells, createLink } from './scripts/init';
import { getMatrix, shuffle, setPositionItems } from './scripts/matrix';
import { findCoordinatesByNumber, isValidForSwap, swap } from './scripts/changePosition';
import { activeSize, soundPlay } from './scripts/settings';
import './styles/styles.scss';


let main = createElement('main', 'main');
let container = createElement('div', 'container');
let title = createElement('h1', 'title');
let menu = createElement('div', 'menu');
let newGame = createElement('button', 'menu__newGame');
let save = createElement('button', 'menu__save');
let results = createElement('button', 'menu__results');
let sound = createElement('button', 'menu__sound');
let data = createElement('div', 'data');
let moves = createElement('div', 'data__moves');
let timer = createElement('div', 'data__timer');
let field = createElement('div', 'field');
let frameSize = createElement('div', 'frameSize');
let sizesMenu = createElement('div', 'sizesMenu');
let link3_3 = createLink('3x3', 'size-3', 3);
let link4_4 = createLink('4x4', 'size-4', 4);
link4_4.classList.add('active');
let link5_5 = createLink('5x5', 'size-5', 5);
let link6_6 = createLink('6x6', 'size-6', 6);
let link7_7 = createLink('7x7', 'size-7', 7);
let link8_8 = createLink('8x8', 'size-8', 8);
let links = [link3_3, link4_4, link5_5, link6_6, link7_7, link8_8];

let myTimer;
let countMoves = 0;


title.textContent = 'Gem Puzzle';

newGame.textContent = 'New Game';
newGame.classList.add('menu__button');

results.textContent = 'Results';
results.classList.add('menu__button');

save.textContent = 'Save';
save.classList.add('menu__button');

sound.textContent = 'Sound';
sound.classList.add('menu__button');

timer.textContent = '00:00:00';
moves.textContent = `moves: ${countMoves}`;

let size = 4;

frameSize.textContent = `Frame size: ${size}x${size}`;


let fieldWidth = '600px';
field.style.width = fieldWidth;
field.style.height = field.style.width;
field.id = 'field';

document.body.append(main);
    main.append(container);
        container.append(title);
        container.append(menu);
            menu.append(newGame);
            menu.append(save);
            menu.append(results);
            menu.append(sound);
        container.append(data);
            data.append(moves);
            data.append(timer);
        container.append(field);
        container.append(frameSize);
        container.append(sizesMenu);
            sizesMenu.append(link3_3);
            sizesMenu.append(link4_4);
            sizesMenu.append(link5_5);
            sizesMenu.append(link6_6);
            sizesMenu.append(link7_7);
            sizesMenu.append(link8_8);






/** Initial generation of cells */
generateCells(size);

/** Getting an array of cells  */
let itemNodes = Array.from(field.querySelectorAll('.cell'));

/** Getting a matrix of elements  */
let matrix = getMatrix(
    itemNodes.map(item => Number(item.dataset.matrixId))
);

/** Shuffle */
matrix = shuffle(matrix, itemNodes);
startTimer();

/** Change position by click */
const blankNumber = 0;
field.addEventListener('click', event => {
    let target = event.target.closest('div');
    
    if (!target)
        return;

    const targetNumber = Number(target.dataset.matrixId);
    const targetCoords = findCoordinatesByNumber(targetNumber, matrix)
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix)
    const isValid = isValidForSwap(targetCoords, blankCoords);

    if (isValid) {
        countMoves++;
        moves.textContent = `moves: ${countMoves}`;
        if (!isSilence)
            soundPlay();
        matrix = swap(blankCoords, targetCoords, matrix);
        matrix = setPositionItems(matrix, itemNodes);
    }
})

/** Change position (drag and drop) */ 
///////////////////////////////////////////////////////////
field.addEventListener('dragover', event => {
    event.preventDefault();
});

field.addEventListener('dragstart', event => {
    event.dataTransfer.setData('id', event.target.id);
    event.target.append(document.getElementById('0'));
})

field.addEventListener('drop', event => {
    let itemId = event.dataTransfer.getData('id');
    console.log(itemId);
    if (event.target.id != '0')
        return;
    event.target.append(document.getElementById(itemId));
})

/** newGame */
newGame.addEventListener('click', () => {
    matrix = shuffle(matrix, itemNodes);
    setDefault();
})

/** Change field size */
sizesMenu.addEventListener('click', event => {
    let targetLink = event.target;

    if (targetLink.classList.contains('sizesMenu'))
        return;

    deleteCells(field);

    size = +targetLink.dataset.size;

    generateCells(size);

    itemNodes = Array.from(field.querySelectorAll('.cell'));

    matrix = getMatrix(
        itemNodes.map(item => Number(item.dataset.matrixId))
    );

    matrix = shuffle(matrix, itemNodes);
    
    matrix = setPositionItems(matrix, itemNodes);

    frameSize.textContent = `Frame size: ${size}x${size}`;

    activeSize(links, size);

    setDefault();
})

/** sound on/off */
let isSilence = false;
sound.addEventListener('click', () => {
    if (sound.innerHTML == 'Sound') {
        sound.innerHTML = 'Silence';
        isSilence = true;
    }
    else {
        sound.innerHTML = 'Sound';
        isSilence = false;
    }
})




function startTimer() {
    let start = Date.now();
    let timeInSeconds;
    myTimer = setInterval(() => {
        let now = Date.now();
        timeInSeconds = Math.floor((now - start) / 1000);
        let hours = Math.floor(timeInSeconds / 3600 % 3600);
        let minutes = Math.floor(timeInSeconds / 60 % 60);
        let seconds = timeInSeconds % 60;
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        timer.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(myTimer);
}

function setDefault() {
    countMoves = 0;
    moves.textContent = `moves: ${countMoves}`;
    stopTimer();
    timer.textContent = '00:00:00';
    startTimer();
}
