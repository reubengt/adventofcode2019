const fs = require("fs");
const path = require("path");

// First, get the contents of the input file for today's puzzle
const inputFilePath = path.join(__dirname, "day3.txt");
const inputFileContents = fs.readFileSync(inputFilePath, "utf-8");

const wireA = inputFileContents.split("\n")[0].split(",");
const wireB = inputFileContents.split("\n")[1].split(",");
console.log("a instruction length", wireA.length);
console.log("b instruction length", wireB.length);

let wireApath = [];
let wireBpath = [];

let wireAx = 0;
let wireAy = 0;
let wireBx = 0;
let wireBy = 0;

wireA.forEach(instruction => {
  let direction = instruction[0];
  let value = Number(instruction.slice(1));
  for (i = 0; i < value; i++) {
    wireAx += direction === "L" ? -1 : direction === "R" ? 1 : 0;
    wireAy += direction === "U" ? 1 : direction === "D" ? -1 : 0;
    let position = `${wireAx},${wireAy}`;
    if (wireApath.indexOf(position) === -1)
      wireApath[wireApath.length] = position;
  }
});
wireB.forEach(instruction => {
  let direction = instruction[0];
  let value = Number(instruction.slice(1));
  for (i = 0; i < value; i++) {
    wireBx += direction === "L" ? -1 : direction === "R" ? 1 : 0;
    wireBy += direction === "U" ? 1 : direction === "D" ? -1 : 0;
    let position = `${wireBx},${wireBy}`;
    if (wireBpath.indexOf(position) === -1)
      wireBpath[wireBpath.length] = position;
  }
});
console.log(wireApath.length);
console.log(wireBpath.length);
// wireBpath = [...wireBpath];
let intersections = wireBpath.filter(position => wireApath.includes(position));
let intersectionDistances = intersections
  .map(position => position.split(",").map(Number))
  .map(([x, y]) => Math.abs(x) + Math.abs(y));
let closestIntersection = intersectionDistances.sort((a, b) => a - b)[0];
console.log(closestIntersection);
