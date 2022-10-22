export function getMatrix(arr) {
    let matrix = [];
    for(let  i = 0; i < Math.sqrt(arr.length); i++) {
        matrix.push([]);
    }

    let y = 0;
    let x = 0;

    for (let i = 0; i < arr.length; i++) {
        if (x >= Math.sqrt(arr.length)) {
            y++;
            x = 0;
        }

        matrix[y][x] = arr[i];
        x++;
    }

    return matrix;
}


export function setPositionItems(matrix, itemNodes) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = itemNodes[value];
            setNodeStyles(node, x, y);
        }
    }

    return matrix;
}

function setNodeStyles(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate(${x * shiftPs}%, ${y * shiftPs}%)`
}


export function shuffle(matrix, itemNodes) {
    const shuffledArray = shuffleArray(matrix.flat());
    matrix = getMatrix(shuffledArray);
    matrix = setPositionItems(matrix, itemNodes);

    return matrix;
}

function shuffleArray(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(( { value }) => value); 
}