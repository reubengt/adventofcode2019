const fs = require("fs");
const path = require("path");
// First, get the contents of the input file for today's puzzle
const inputFilePath = path.join(__dirname, "day5.txt");
const inputFileContents = fs.readFileSync(inputFilePath, "utf-8");

// Next, let's put every line in the input file into an array
const input = inputFileContents.split(",");
// const input = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9".split(",");
let intcodeCompiler = (input, integerInput) => {
  let returnValue = 0;
  let inputArr = input.map(Number);
  let opIndex = 0;
  do {
    let opCodeArr = inputArr[opIndex]
      .toString()
      .split("")
      .map(Number);
    let opCode = 0;
    if (opCodeArr.slice(opCodeArr.length - 2).join("") === "99") opCode = 99;
    else opCode = opCodeArr[opCodeArr.length - 1];
    let parameterModes = opCodeArr.slice(0, opCodeArr.length - 2).reverse();
    switch (opCode) {
      case 99:
        return returnValue;
      case 1:
      case 2: {
        while (parameterModes.length < 3) parameterModes.push(0);
        let param1 =
          parameterModes[0] === 0
            ? inputArr[inputArr[opIndex + 1]]
            : inputArr[opIndex + 1];
        let param2 =
          parameterModes[1] === 0
            ? inputArr[inputArr[opIndex + 2]]
            : inputArr[opIndex + 2];
        if (opCode === 1) inputArr[inputArr[opIndex + 3]] = param1 + param2;
        else inputArr[inputArr[opIndex + 3]] = param1 * param2;
        opIndex += 4;
        break;
      }
      case 3: {
        inputArr[inputArr[opIndex + 1]] = integerInput;
        opIndex += 2;
        break;
      }
      case 4: {
        while (parameterModes.length < 1) parameterModes.push(0);
        let param =
          parameterModes[0] === 0
            ? inputArr[inputArr[opIndex + 1]]
            : inputArr[opIndex + 1];
        returnValue = param;
        console.log("OUTPUT:", param);
        opIndex += 2;
        break;
      }
      case 5:
      case 6: {
        while (parameterModes.length < 2) parameterModes.push(0);
        let param1 =
          parameterModes[0] === 0
            ? inputArr[inputArr[opIndex + 1]]
            : inputArr[opIndex + 1];
        let param2 =
          parameterModes[1] === 0
            ? inputArr[inputArr[opIndex + 2]]
            : inputArr[opIndex + 2];
        if (opCode === 5) opIndex = param1 !== 0 ? param2 : opIndex + 3;
        else opIndex = param1 === 0 ? param2 : opIndex + 3;
        break;
      }

      case 7:
      case 8: {
        while (parameterModes.length < 2) parameterModes.push(0);
        let param1 =
          parameterModes[0] === 0
            ? inputArr[inputArr[opIndex + 1]]
            : inputArr[opIndex + 1];
        let param2 =
          parameterModes[1] === 0
            ? inputArr[inputArr[opIndex + 2]]
            : inputArr[opIndex + 2];
        if (opCode === 7) {
          inputArr[inputArr[opIndex + 3]] = param1 < param2 ? 1 : 0;
        } else {
          inputArr[inputArr[opIndex + 3]] = param1 === param2 ? 1 : 0;
        }
        opIndex += 4;
        break;
      }
    }
  } while (returnValue < 1);
};

console.log("part1:");
intcodeCompiler(input, 1);
console.log("part2: ");
intcodeCompiler(input, 5);
