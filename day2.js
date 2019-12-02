const fs = require("fs");
const path = require("path");

// First, get the contents of the input file for today's puzzle
const inputFilePath = path.join(__dirname, "day2.txt");
const inputFileContents = fs.readFileSync(inputFilePath, "utf-8");

// Next, let's put every line in the input file into an array - the last line
// will be blank, so we'll remove the last item in the array
const input = inputFileContents.split(",");

let intcodeCompiler = (input, noun, verb) => {
  let inputArr = input.map(Number);
  inputArr[1] = noun;
  inputArr[2] = verb;
  for (let opIndex = 0; opIndex < inputArr.length; opIndex += 4)
    switch (inputArr[opIndex]) {
      case 99:
        return inputArr[0];
      case 1: {
        inputArr[inputArr[opIndex + 3]] =
          inputArr[inputArr[opIndex + 1]] + inputArr[inputArr[opIndex + 2]];
        break;
      }
      case 2: {
        inputArr[inputArr[opIndex + 3]] =
          inputArr[inputArr[opIndex + 1]] * inputArr[inputArr[opIndex + 2]];
        break;
      }
    }
  return inputArr[0];
};
console.log("PART 1", intcodeCompiler(input, 12, 2));
//part 2
let intcodePairFinder = requiredOutput => {
  for (let n = 0; n <= 99; n++) {
    for (let v = 0; v <= 99; v++) {
      if (intcodeCompiler(input, n, v) === requiredOutput) return 100 * n + v;
    }
  }
};
console.log("PART 2", intcodePairFinder(19690720));
