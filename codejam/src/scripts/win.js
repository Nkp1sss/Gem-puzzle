export default function isWon(matrix) {
    const myArray = matrix.flat().map((elem) => elem);
    const defaultArray = [];
    for (let i = 1; i < myArray.length; i++) {
        defaultArray.push(i);
    }
    defaultArray.push(0);

    for (let i = 0; i < defaultArray.length; i++) {
        if (defaultArray[i] !== myArray[i]) {
            return false;
        }
    }

    return true;
}
