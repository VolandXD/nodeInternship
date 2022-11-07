const myArray = [1, 10, 3, 6, 'ArrayElement'];

/**
 * 1. Log 3 and 6 elements from myArray to console
 * Please, use more than on solution
 */
/**
 *I not sure that need output 3 and 6 from array or elements with index 3 and 6
 * first part */
console.log(myArray.filter((item) => item === 3 || item === 6))
function find(e) {
    let index;
     index = myArray.findIndex((item) => item === e)
    return myArray[index];
}
console.log(find(3))
console.log(find(6))
/**
 * second part*/
console.log(`3: ${myArray[3]}`);
console.log(`6: ${myArray[6]}`);
function arrEl() {
    for (let i = 0; i <= 6; i++) {
        if (i === 3 || i === 6) console.log(myArray[i])
    }
}
arrEl();
/**
 *  2. Log type of each element
 */

myArray.forEach((item) => {
    console.log(typeof item)
});

/**
 *  3. Check if all elements in array is Number
 *  Should return Boolean
 */

const isNumber = myArray.every((item) => typeof item === 'number');

console.log({
    isNumber,
});

/**
 * 4. Check if at least one element is bigger than 5
 * Should return Boolean
 */

const isBiggerThanFive = myArray.some((item) => item > 5);

console.log({
    isBiggerThanFive,
});

/**
 * 5. Create another variable that will include only elements that bigger than 5
 * Should return another Array
 */

const elementsBiggerThanFive = myArray.filter((item) => item > 5);

console.log({
    elementsBiggerThanFive,
});

/**
 * 6. Multiply numbers of Array by 2
 * Should return another Array
 */

const multiplied = myArray.map((item) => {
    if (typeof item === 'number') {
        return item * 2
    } else {
        return item
    }
});

console.log({
    multiplied,
});

/**
 * 7. Calculate array sum
 */

const sum = myArray.reduce((oldVal, newVal) => oldVal + newVal);

console.log({
    sum,
});

/**
 * 8. Sort array in ascending and descending order
 */
const tempArray = myArray.slice();
const asc = tempArray.sort((a, b) => a - b);
const desc = myArray.sort((a, b) => b - a);

console.log({
    asc,
    desc,
});
