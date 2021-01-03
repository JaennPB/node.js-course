const http = require("http");
const url = require("url");
const fs = require("fs");
const { type } = require("os");

// *************************************************** FUNCTIONS
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

// *************************************************** SYNCHRONOUSLY READING DATA (ONCE, AT BEGINNING OF PROGRAM)
// ********************* JSON DATA
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

// ********************* OVERVIEW
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
// ********************* CARD
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
// ********************* PRODUCT
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// *************************************************** CREATING SERVER AND ROUTING
// ********************* CREATE SERVER
const server = http.createServer((req, res) => {
  const pathName = req.url;

  // ======================== ROUTING
  // OVERVIEW
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    // replacing html placeholders with data.json
    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    // console.log(cardsHtml);

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

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

// ********************* CREATE SERVER URL
server.listen(1234, "127.0.0.1", () => {
  console.log("Starting Server...");
});
