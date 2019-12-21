const fs = require("fs");
const path = require("path");
// First, get the contents of the input file for today's puzzle
const inputFilePath = path.join(__dirname, "day6.txt");
const inputFileContents = fs.readFileSync(inputFilePath, "utf-8");

const input = inputFileContents.split("\n").map(orbit => orbit.split(")"));

const orbitSum = input => {
  //array to track which planets have already been counted
  const inputArr = input;
  let totalOrbitCount = 0;
  inputArr.forEach(orbitRelation => {
    //one direct orbit for each relation
    totalOrbitCount++;
    let indirectOrbits = countIndirectOrbits(orbitRelation[0], inputArr);
    totalOrbitCount += indirectOrbits;
  });
  return totalOrbitCount;
};

const countIndirectOrbits = (planet, inputArray) => {
  inputArr = inputArray;
  let planetToFindLink = planet;
  let indirectOrbits = 0;
  while (planetToFindLink !== "COM") {
    planetToFindLink = inputArray.find(
      orbitRelation => orbitRelation[1] === planetToFindLink
    )[0];
    indirectOrbits++;
  }
  return indirectOrbits;
};

console.log("PART 1: ", orbitSum(input));
