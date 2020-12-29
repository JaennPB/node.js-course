// getting the fs module from node
// will return an object which will give us access to methods from module
// require() function is the easiest way to include modules that exist in different files
const fs = require("fs");

// to read a file SYNChronously
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

// to write a file
const textOut = `This is what we know about avocados: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File was written...");
