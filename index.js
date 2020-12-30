const http = require("http");
const url = require("url");
const fs = require("fs");
const { type } = require("os");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found 404</h1>");
  }
});

server.listen(1234, "127.0.0.1", () => {
  console.log("🔁 Starting Server...");
  console.log("✅ Ready, listening...");
});
