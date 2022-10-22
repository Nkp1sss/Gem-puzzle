export function createElement(tagName, className) {
    let element = document.createElement(tagName);
    element.classList.add(className);
    return element;
}

export function generateCells(size = 4) {
    let field = document.querySelector('.field');

    for (let i = 0; i < size ** 2; i++) {
        let cell = createElement('div', 'cell'); 
        // cell.style.width = parseInt(field.style.width, 10) / size + 'px';
        cell.style.width = 100 / size + '%';
        cell.style.height = cell.style.width;
        cell.textContent =  i;
        cell.setAttribute('data-matrix-id', i);
        field.append(cell);
    }
}
