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


title.textContent = 'Gem Puzzle';

newGame.textContent = 'New Game';
newGame.classList.add('menu__button');

results.textContent = 'Results';
results.classList.add('menu__button');

save.textContent = 'Save';
save.classList.add('menu__button');

sound.textContent = 'Sound';
sound.classList.add('menu__button');

timer.textContent = 'timer';
moves.textContent = 'moves';

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
        soundPlay();
        matrix = swap(blankCoords, targetCoords, matrix);
        matrix = setPositionItems(matrix, itemNodes);
    }
})

/** newGame */
newGame.addEventListener('click', () => {
    matrix = shuffle(matrix, itemNodes);
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
})