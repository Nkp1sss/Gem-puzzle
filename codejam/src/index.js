import { createElement, generateCells } from './scripts/generate';
import { getMatrix, shuffle, setPositionItems } from './scripts/matrix';
import { findCoordinatesByNumber, isValidForSwap, swap } from './scripts/changePosition';
import './styles/styles.scss';


let main = createElement('main', 'main');
let container = createElement('div', 'container');
let field = createElement('div', 'field');
let title = createElement('h1', 'title');
let menu = createElement('div', 'menu');
let newGame = createElement('button', 'menu__newGame');
let save = createElement('button', 'menu__save');
let results = createElement('button', 'menu__results');
let sound = createElement('button', 'menu__sound');
let frameSize = createElement('div', 'frameSize');

document.body.append(main);
    main.append(container);
        container.append(title);
        container.append(menu);
            menu.append(newGame);
            menu.append(save);
            menu.append(results);
            menu.append(sound);
        container.append(field);
        container.append(frameSize);

title.textContent = 'Gem Puzzle';

newGame.textContent = 'New Game';
newGame.classList.add('menu__button');

results.textContent = 'Results';
results.classList.add('menu__button');

save.textContent = 'Save';
save.classList.add('menu__button');

sound.textContent = 'Sound';
sound.classList.add('menu__button');

let size = 4;
frameSize.textContent = `Frame size: ${size}x${size}`;

let fieldWidth = '600px';
field.style.width = fieldWidth;
field.style.height = field.style.width;
field.id = 'field';


/** Initial generation of cells */
generateCells(4);

/** Getting an array of cells  */
let itemNodes = Array.from(field.querySelectorAll('.cell'));

/** Getting a matrix of elements  */
let matrix = getMatrix(
    itemNodes.map(item => Number(item.dataset.matrixId))
);

/** Shuffle */
matrix = shuffle(matrix, itemNodes);


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
        matrix = swap(blankCoords, targetCoords, matrix);
        matrix = setPositionItems(matrix, itemNodes);
    }
})

/** newGame */
newGame.addEventListener('click', () => {
    matrix = shuffle(matrix, itemNodes);
})