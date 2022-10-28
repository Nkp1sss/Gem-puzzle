import { createElement, generateCells, deleteCells, createLink } from './scripts/init';
import { getMatrix, shuffle, setPositionItems } from './scripts/matrix';
import { findCoordinatesByNumber, isValidForSwap, swap } from './scripts/changePosition';
import { activeSize, soundPlay } from './scripts/settings';
import isWon from './scripts/win';
import './styles/styles.scss';

/** Main elements */
const main = createElement('main', 'main');
const container = createElement('div', 'container');
const title = createElement('h1', 'title');
const menu = createElement('div', 'menu');
const newGame = createElement('button', 'menu__newGame');
const save = createElement('button', 'menu__save');
const load = createElement('button', 'menu__load');
const sound = createElement('button', 'menu__sound');
const results = createElement('button', 'menu__results');
const data = createElement('div', 'data');
const moves = createElement('div', 'data__moves');
const timer = createElement('div', 'data__timer');
const field = createElement('div', 'field');
const frameSize = createElement('div', 'frameSize');
const sizesMenu = createElement('div', 'sizesMenu');
const link3_3 = createLink('3x3', 'size-3', 3);
const link4_4 = createLink('4x4', 'size-4', 4);
link4_4.classList.add('active');
const link5_5 = createLink('5x5', 'size-5', 5);
const link6_6 = createLink('6x6', 'size-6', 6);
const link7_7 = createLink('7x7', 'size-7', 7);
const link8_8 = createLink('8x8', 'size-8', 8);
const links = [link3_3, link4_4, link5_5, link6_6, link7_7, link8_8];

/** Additional elements */
const overlay = createElement('div', 'overlay');
const win = createElement('div', 'win');
const resultsTable = createElement('div', 'results-table');
const resultsTitle = createElement('div', 'results-title');
const resultsNumber = createElement('div', 'results-number');
const resultsTime = createElement('div', 'results-time');
const resultsMoves = createElement('div', 'results-moves');
const resultsWrapper = createElement('div', 'results-wrapper');

let myTimer;
let countMoves = 0;
let size = 4;
let isSilence = false;

title.textContent = 'Gem Puzzle';

newGame.textContent = 'New Game';
newGame.classList.add('menu__button');

load.textContent = 'Load';
load.classList.add('menu__button');

save.textContent = 'Save';
save.classList.add('menu__button');

sound.textContent = 'Sound';
sound.classList.add('menu__button');

results.textContent = 'Results';
results.classList.add('menu__button');

timer.textContent = '00:00:00';
moves.textContent = `moves: ${countMoves}`;

resultsNumber.textContent = 'Number';
resultsTime.textContent = 'Time';
resultsMoves.textContent = 'Moves';

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
            menu.append(load);
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
    main.append(overlay);
        overlay.append(win);
        overlay.append(resultsTable);
            resultsTable.append(resultsTitle);
                resultsTitle.append(resultsNumber);
                resultsTitle.append(resultsTime);
                resultsTitle.append(resultsMoves);
            resultsTable.append(resultsWrapper);

/** Initial generation of cells */
generateCells(size);

/** Getting an array of cells  */
let itemNodes = Array.from(field.querySelectorAll('.cell'));

/** Getting a matrix of elements  */
let matrix = getMatrix(itemNodes.map((item) => Number(item.dataset.matrixId)));

/** Shuffle */
matrix = shuffle(matrix, itemNodes);
startTimer();

/** Change position by click */
const blankNumber = 0;
field.addEventListener('click', (event) => {
    const target = event.target.closest('div');
    if (!target) {
        return;
    }

    const targetNumber = Number(target.dataset.matrixId);
    const targetCoords = findCoordinatesByNumber(targetNumber, matrix);
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
    const isValid = isValidForSwap(targetCoords, blankCoords);

    if (isValid) {
        countMoves++;
        moves.textContent = `moves: ${countMoves}`;
        if (!isSilence) {
            soundPlay();
        }
        matrix = swap(blankCoords, targetCoords, matrix);
        matrix = setPositionItems(matrix, itemNodes);

        setTimeout(() => {
            if (isWon(matrix)) {
                overlay.classList.add('overlay__active');
                win.innerHTML = `Hooray!<br/>You solved the puzzle in ${timer.textContent} and ${countMoves} moves!`;
                win.classList.add('win__active');

                stopTimer();
            }
        }, 100);
    }
});

/** Change position (drag and drop) */
field.addEventListener('dragover', (event) => {
    event.preventDefault();
});

field.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('id', event.target.id);
});

field.addEventListener('drop', (event) => {
    if (event.target.id === '0') {
        const itemId = event.dataTransfer.getData('id');
        const trg = document.getElementById(itemId);
        const targetNumber = Number(trg.dataset.matrixId);
        const targetCoords = findCoordinatesByNumber(targetNumber, matrix);
        const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
        const isValid = isValidForSwap(targetCoords, blankCoords);

        if (isValid) {
            countMoves++;
            moves.textContent = `moves: ${countMoves}`;
            if (!isSilence) {
                soundPlay();
            }
            matrix = swap(blankCoords, targetCoords, matrix);
            matrix = setPositionItems(matrix, itemNodes);

            setTimeout(() => {
                if (isWon(matrix)) {
                    overlay.classList.add('overlay__active');
                    win.innerHTML = `Hooray!<br/>You solved the puzzle in ${timer.textContent} and ${countMoves} moves!`;
                    win.classList.add('win__active');

                    stopTimer();
                }
            }, 100);
        }
    }
});

/** newGame */
newGame.addEventListener('click', () => {
    matrix = shuffle(matrix, itemNodes);
    setDefault();
});

/** Change field size */
sizesMenu.addEventListener('click', (event) => {
    const targetLink = event.target;

    if (targetLink.classList.contains('sizesMenu')) {
        return;
    }

    deleteCells(field);

    size = +targetLink.dataset.size;

    generateCells(size);

    itemNodes = Array.from(field.querySelectorAll('.cell'));

    matrix = getMatrix(itemNodes.map((item) => Number(item.dataset.matrixId)));

    matrix = shuffle(matrix, itemNodes);

    matrix = setPositionItems(matrix, itemNodes);

    frameSize.textContent = `Frame size: ${size}x${size}`;

    activeSize(links, size);

    setDefault();
});

/** sound on/off */
sound.addEventListener('click', () => {
    if (sound.innerHTML === 'Sound') {
        sound.innerHTML = 'Silence';
        isSilence = true;
    } else {
        sound.innerHTML = 'Sound';
        isSilence = false;
    }
});
/** Window resize */
window.addEventListener('resize', () => {
    setDefault();
    if (window.innerWidth <= 600) {
        deleteCells(field);
        fieldWidth = '300px';
        generateCells(size);

        itemNodes = Array.from(field.querySelectorAll('.cell'));

        matrix = getMatrix(itemNodes.map((item) => Number(item.dataset.matrixId)));

        matrix = shuffle(matrix, itemNodes);

        matrix = setPositionItems(matrix, itemNodes);
    } else {
        deleteCells(field);
        fieldWidth = '600px';
        generateCells(size);

        itemNodes = Array.from(field.querySelectorAll('.cell'));

        matrix = getMatrix(itemNodes.map((item) => Number(item.dataset.matrixId)));

        matrix = shuffle(matrix, itemNodes);

        matrix = setPositionItems(matrix, itemNodes);
    }
});

/** Close modal window */
overlay.addEventListener('click', () => {
    overlay.classList.remove('overlay__active');
    if (win.classList.contains('win__active')) {
        win.classList.remove('win__active');
    }

    if (resultsTable.classList.contains('results-table__active')) {
        resultsTable.classList.remove('results-table__active');
    }

    if (isWon(matrix)) {
        saveResults();
        matrix = shuffle(matrix, itemNodes);
        setDefault();
    }
});

/** Save game instance */
save.onclick = saveLS;

function saveLS() {
    const saveObject = {
        Size: size,
        Matrix: matrix,
        Moves: countMoves,
        Time: timer.textContent,
    };

    const serialObj = JSON.stringify(saveObject);

    localStorage.setItem('gameInstance', serialObj);
}

/** Load game instance */
load.onclick = loadLS;

function loadLS() {
    if (localStorage.getItem('gameInstance') == null) {
        return;
    }

    const returnObject = JSON.parse(localStorage.getItem('gameInstance'));

    deleteCells(field);

    size = returnObject.Size;
    countMoves = returnObject.Moves;

    generateCells(size);

    itemNodes = Array.from(field.querySelectorAll('.cell'));

    matrix = returnObject.Matrix;

    matrix = setPositionItems(matrix, itemNodes);

    frameSize.textContent = `Frame size: ${size}x${size}`;

    activeSize(links, size);

    const timeArray = returnObject.Time.split(':');
    const elapsedTime = (+timeArray[0] * 3600 + +timeArray[1] * 60 + +timeArray[2]) * 1000;
    stopTimer();
    startTimer(elapsedTime);
    timer.textContent = returnObject.Time;
    moves.textContent = `moves: ${countMoves}`;
}

/** Show results table */
results.addEventListener('click', () => {
    overlay.classList.add('overlay__active');
    resultsTable.classList.add('results-table__active');
    loadResults();
});

/** Save result after win */
function saveResults() {
    let arrayResults = [];
    if (localStorage.getItem('results') == null) {
        localStorage.setItem('results', JSON.stringify(arrayResults));
    }

    arrayResults = JSON.parse(localStorage.getItem('results'));

    arrayResults.push({ Moves: countMoves, Time: timer.textContent });

    localStorage.setItem('results', JSON.stringify(arrayResults));
}

/** Load result before open 'results' */
function loadResults() {
    if (localStorage.getItem('results') == null) {
        return;
    }

    const arrayResults = JSON.parse(localStorage.getItem('results'));
    sortResults(arrayResults);

    resultsWrapper.innerHTML = '';

    for (let i = 0; i < arrayResults.length; i++) {
        const resultsItem = createElement('div', 'results-item');
        resultsWrapper.append(resultsItem);

        const resultsItemNumber = createElement('div', 'results-item-number');
        const resultsItemTime = createElement('div', 'results-item-time');
        const resultsItemMoves = createElement('div', 'results-item-moves');

        resultsItemNumber.textContent = i + 1;
        resultsItemTime.textContent = arrayResults[i].Time;
        resultsItemMoves.textContent = arrayResults[i].Moves;

        resultsItem.append(resultsItemNumber, resultsItemTime, resultsItemMoves);

        if (i === 9) {
            break;
        }
    }
}

function sortResults(array) {
    array.sort((a, b) => a.Moves - b.Moves); // сортировка по количеству мувов
}

/** Functions for timer */
function startTimer(time = 0) {
    const start = Date.now() - time;
    let timeInSeconds;
    myTimer = setInterval(() => {
        const now = Date.now();
        timeInSeconds = Math.floor((now - start) / 1000);
        let hours = Math.floor((timeInSeconds / 3600) % 3600);
        let minutes = Math.floor((timeInSeconds / 60) % 60);
        let seconds = timeInSeconds % 60;
        if (hours < 10) hours = `0${hours}`;
        if (minutes < 10) minutes = `0${minutes}`;
        if (seconds < 10) seconds = `0${seconds}`;
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
