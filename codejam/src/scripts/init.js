export function createElement(tagName, className) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    return element;
}

export function generateCells(size = 4) {
    const field = document.querySelector('.field');

    for (let i = 0; i < size ** 2; i++) {
        const cell = createElement('div', 'cell');
        cell.style.width = `${100 / size}%`;
        cell.style.height = cell.style.width;
        cell.textContent = i;
        cell.setAttribute('data-matrix-id', i);
        cell.id = i;
        cell.draggable = true;
        field.append(cell);
    }
}

export function createLink(_textContent, className, attributeValue) {
    const link = createElement('a', 'menu__link');
    link.textContent = _textContent;
    link.classList.add(className);
    link.setAttribute('data-size', attributeValue);
    link.href = '#';

    return link;
}

export function deleteCells(field) {
    field.innerHTML = '';
}
