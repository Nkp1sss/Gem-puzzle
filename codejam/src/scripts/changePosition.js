export function findCoordinatesByNumber(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == number)
                return {x, y};
        }
    }
    return null;
}

export function isValidForSwap(coords1, coords2) {
    if (coords1.x === coords2.x) {  
        if (Math.abs(coords1.y - coords2.y) == 1)
            return true;
    }
    if (coords1.y === coords2.y) {  
        if (Math.abs(coords1.x - coords2.x) == 1)
            return true;
    }
    return false;
}

export function swap(coords1, coords2, matrix) {
    const coords1Number = matrix[coords1.y][coords1.x];
    matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
    matrix[coords2.y][coords2.x] = coords1Number;
    return matrix;
}