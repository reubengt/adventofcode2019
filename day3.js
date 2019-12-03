const fs = require("fs");
const path = require("path");

// First, get the contents of the input file for today's puzzle
const inputFilePath = path.join(__dirname, "day3.txt");
const inputFileContents = fs.readFileSync(inputFilePath, "utf-8");

const wireA = inputFileContents.split("\n")[0].split(",");
const wireB = inputFileContents.split("\n")[1].split(",");

let wireApath = new Set();
let wireBpath = new Set();

let wireAx = 0;
let wireAy = 0;
let wireBx = 0;
let wireBy = 0;

let stepsA = {};
let stepsB = {};
let stepsAcount = 0;
let stepsBcount = 0;
wireA.forEach(instruction => {
  let direction = instruction[0];
  let value = Number(instruction.slice(1));
  for (let i = 0, steps = 0; i < value; i++) {
    wireAx += direction === "L" ? -1 : direction === "R" ? 1 : 0;
    wireAy += direction === "U" ? 1 : direction === "D" ? -1 : 0;
    position = `${wireAx},${wireAy}`;
    wireApath.add(position);
    stepsAcount += 1;
    stepsA[position] = stepsA[position] ? stepsA[position] : stepsAcount;
  }
});
wireB.forEach(instruction => {
  let direction = instruction[0];
  let value = Number(instruction.slice(1));
  for (let i = 0, steps = 0; i < value; i++) {
    wireBx += direction === "L" ? -1 : direction === "R" ? 1 : 0;
    wireBy += direction === "U" ? 1 : direction === "D" ? -1 : 0;
    position = `${wireBx},${wireBy}`;
    wireBpath.add(position);
    stepsBcount += 1;
    stepsB[position] = stepsB[position] ? stepsB[position] : stepsBcount;
  }
});
wireBpath = [...wireBpath];
let intersections = wireBpath.filter(position => wireApath.has(position));
let intersectionDistances = intersections
  .map(position => position.split(",").map(Number))
  .map(([x, y]) => Math.abs(x) + Math.abs(y));
let closestIntersectionDistance = intersectionDistances.sort(
  (a, b) => a - b
)[0];
console.log(
  "PART 1 - closesIntersectionDistance: ",
  closestIntersectionDistance
);
//part 2
let intersectionCombinedSteps = intersections.map(intersectionPos => {
  //   console.log("WIREA steps", stepsA[intersectionPos]);
  //   console.log("WIREB steps", stepsB[intersectionPos]);
  return stepsA[intersectionPos] + stepsB[intersectionPos];
});
let leastCombinedSteps = intersectionCombinedSteps.sort((a, b) => a - b)[0];
console.log("PART 2 - leastCombinedSteps: ", leastCombinedSteps);
