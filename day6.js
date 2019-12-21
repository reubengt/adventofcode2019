const fs = require("fs");
const path = require("path");
// First, get the contents of the input file for today's puzzle
const inputFilePath = path.join(__dirname, "day6.txt");
const inputFileContents = fs.readFileSync(inputFilePath, "utf-8");

const input = inputFileContents.split("\n").map(orbit => orbit.split(")"));

const orbitSum = input => {
  const inputArr = input;
  let totalOrbitCount = 0;
  inputArr.forEach(orbitRelation => {
    //one direct orbit for each relation
    totalOrbitCount++;
    let indirectOrbitsArr = findIndirectOrbits(orbitRelation[0], inputArr);
    totalOrbitCount += indirectOrbitsArr.length;
  });
  return totalOrbitCount;
};

const findIndirectOrbits = (planet, inputArray) => {
  inputArr = inputArray;
  let planetToFindLink = planet;
  let indirectOrbits = [];
  while (planetToFindLink !== "COM") {
    planetToFindLink = inputArray.find(
      orbitRelation => orbitRelation[1] === planetToFindLink
    )[0];
    indirectOrbits.push(planetToFindLink);
  }
  return indirectOrbits;
};

const youToSanta = input => {
  const inputArr = input;
  const planetOrbitedbyYou = inputArr.find(
    orbitRelation => orbitRelation[1] == "YOU"
  )[0];
  const planetOrbitedbySan = inputArr.find(
    orbitRelation => orbitRelation[1] == "SAN"
  )[0];
  const indirectOrbitsYou = findIndirectOrbits(planetOrbitedbyYou, inputArr);
  const indirectOrbitsSanta = findIndirectOrbits(planetOrbitedbySan, inputArr);
  const commonPlanet = indirectOrbitsYou.find(orbit =>
    indirectOrbitsSanta.includes(orbit)
  );
  const orbitalTransfers =
    indirectOrbitsYou.indexOf(commonPlanet) +
    indirectOrbitsSanta.indexOf(commonPlanet) +
    2;
  //+2 to account for zero indexing
  return orbitalTransfers;
};
console.log("PART 1: ", orbitSum(input));
console.log("PART 2: ", youToSanta(input));
