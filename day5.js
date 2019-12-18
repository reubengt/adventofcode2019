const fs = require("fs");
const path = require("path");
// First, get the contents of the input file for today's puzzle
const inputFilePath = path.join(__dirname, "day5.txt");
const inputFileContents = fs.readFileSync(inputFilePath, "utf-8");

// Next, let's put every line in the input file into an array
const input = inputFileContents.split(",");

let intcodeCompiler = (input, integerInput) => {
  let returnValue = 0;
  let inputArr = input.map(Number);
  let opIndex = 0;
  do {
    let opCodeArr = inputArr[opIndex]
      .toString()
      .split("")
      .map(Number);
    let opCode = opCodeArr[opCodeArr.length - 1];
    let parameterModes = opCodeArr.slice(0, opCodeArr.length - 2).reverse();
    switch (opCode) {
      case 99:
        return returnValue;
      case 1:
      case 2: {
        while (parameterModes.length < 3) parameterModes.push(0);
        let operand1 =
          parameterModes[0] === 0
            ? inputArr[inputArr[opIndex + 1]]
            : inputArr[opIndex + 1];
        let operand2 =
          parameterModes[1] === 0
            ? inputArr[inputArr[opIndex + 2]]
            : inputArr[opIndex + 2];
        if (opCode === 1) inputArr[inputArr[opIndex + 3]] = operand1 + operand2;
        else inputArr[inputArr[opIndex + 3]] = operand1 * operand2;
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
        let arg =
          parameterModes[0] === 0
            ? inputArr[inputArr[opIndex + 1]]
            : inputArr[opIndex + 1];
        console.log(arg);
        returnValue = arg;
        opIndex += 2;
        break;
      }
    }
  } while (returnValue < 1);
};

intcodeCompiler(input, 1);
