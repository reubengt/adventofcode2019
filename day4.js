const inputLower = 273025;
const inputHigher = 767253;

let count = 0;
for (let num = inputLower; num < inputHigher; num++) {
  numString = num.toString();
  let ascending = false;
  let doubleAdjacent = false;
  if (
    numString
      .split("")
      .map(Number)
      .sort((a, b) => a - b)
      .join("") === numString
  )
    ascending = true;
  for (let i = 0; i < 5; i++) {
    if (numString[i] === numString[i + 1]) {
      doubleAdjacent = true;
      break;
    }
  }
  if (ascending && doubleAdjacent) count++;
}
console.log("PART 1: ", count);

//part 2
let count2 = 0;
for (let num = inputLower; num < inputHigher; num++) {
  numString = num.toString();
  let ascending = false;
  let doubleAdjacent = false;
  if (
    numString
      .split("")
      .map(Number)
      .sort((a, b) => a - b)
      .join("") === numString
  )
    ascending = true;
  for (let i = 0; i < 5; i++) {
    if (
      numString[i] === numString[i + 1] &&
      numString.match(new RegExp(numString[i], "g")).length === 2
    ) {
      doubleAdjacent = true;
      break;
    }
  }
  if (ascending && doubleAdjacent) count2++;
}
console.log("PART 2:", count2);
