export function isWon(matrix) {
    let myArray = matrix.flat().map(elem => elem);
    let defaultArray = [];
    for(let i = 1; i < myArray.length; i++) {
        defaultArray.push(i);
    }
    defaultArray.push(0);
    
    console.log(myArray, defaultArray);
    for (let i = 0; i < defaultArray.length; i++) {
        if (defaultArray[i] != myArray[i])
            return false;
    }
    
    return true;
}
// export function isWon(matrix) {
//     let myArray = matrix.flat().map(elem => elem);
//     let defaultArray = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    
//     console.log(myArray, defaultArray);
//     for (let i = 0; i < defaultArray.length; i++) {
//         if (defaultArray[i] != myArray[i])
//             return false;
//     }
    
//     return true;
// }