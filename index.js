const http = require("http");
const url = require("url");
const fs = require("fs");
const { type } = require("os");

// *************************************************** SYNCHRONOUSLY READING DATA
// ********************* JSON DATA
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

// ********************* OVERVIEW
const temOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
// ********************* CARD
const temCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
// ********************* PRODUCT
const temProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// *************************************************** CREATING SERVER AND ROUTING
// ********************* CREATE SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // OVERVIEW
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");

    // PRODUCTS
  } else if (pathName === "/products") {
    res.end("This is the overview");

    // API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // NOT FOUND
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
