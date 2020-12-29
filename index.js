// getting the fs module from node
// will return an object which will give us access to methods from module

// require() function is the easiest way to include modules that exist in different files
const fs = require("fs");
const http = require("http");
const url = require("url");

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

// creeating servers, we get (request, response)
const server = http.createServer((req, res) => {
  // routing
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("Hello, master. I am the new server you just created (OVERVIEW)");
  } else if (pathName === "/product") {
    res.end("This is product #01");
  } else {
    res.writeHead(404, {
      // http headers (piece of info about response)
      // always send BEFORE response
      "Content-type": "text/html",
      "my-own-header": "this is info",
    });
    res.end("<h1>This page could not be found</h1>");
  }
});

// listening for request (url changes in created server)
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
