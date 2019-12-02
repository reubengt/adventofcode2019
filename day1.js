const fs = require("fs");
const path = require("path");

// First, get the contents of the input file for today's puzzle
const inputFilePath = path.join(__dirname, "day1.txt");
const inputFileContents = fs.readFileSync(inputFilePath, "utf-8");

// Next, let's put every line in the input file into an array - the last line
// will be blank, so we'll remove the last item in the array
const input = inputFileContents.split("\n");
input.pop();

const massArray = input;
console.log(massArray);

const fuelCounterUpper = mass => {
  return Math.floor(mass / 3) - 2;
};
const fuelTotal = massArray.reduce((fuelTotal, currentMass) => {
  return fuelTotal + fuelCounterUpper(currentMass);
}, 0);
console.log(fuelTotal);

const complexFuelCounterUpper = initialMass => {
  let currentFuel = initialMass;
  let requiredFuel = 0;
  while (fuelCounterUpper(currentFuel) > 0) {
    requiredFuel += fuelCounterUpper(currentFuel);
    currentFuel = fuelCounterUpper(currentFuel);
  }
  return requiredFuel;
};

const newFuelTotal = massArray.reduce((fuelTotal, currentMass) => {
  return fuelTotal + complexFuelCounterUpper(currentMass);
}, 0);
console.log(newFuelTotal);
