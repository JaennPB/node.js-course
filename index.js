// getting the fs module from node
// will return an object which will give us access to methods from module

// require() function is the easiest way to include modules that exist in different files
const fs = require("fs");
const http = require("http");

// *******************************************
// ************************************* files

// ********************* blocking synchronous way

// to read a file
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// to write a file
const textOut = `This is what we know about avocados: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File was written...");

// ********************* non blocking asynchronous way

// CALLBACK HELL (DON'T DO THIS)
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error 💥");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    // console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      //   console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        // console.log("File was written");
      });
    });
  });
});
console.log("reading file...");

// *******************************************
// ************************************ server

const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello, master. I am the new server you just created");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

// by using 127.0.0.1:8000 as a url, a new request is created, and we get the response from created server
