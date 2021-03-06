// *************************************************** MODULE IMPORTS
// core modules
const http = require('http');
const url = require('url');
const fs = require('fs');

// 3rd party modules
const slugify = require('slugify');

// own modules
const replaceTemplate = require('./modules/replaceTemplate');

// *************************************************** SYNCHRONOUSLY READING DATA
// ********************* JSON DATA
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

// ********************* SLUGS

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

// ********************* OVERVIEW
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
// ********************* CARD
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
// ********************* PRODUCT
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

// *************************************************** CREATING SERVER AND ROUTING
// ********************* CREATE SERVER
const server = http.createServer((req, res) => {
  // parsing url (getting url object) with url module and using destructuring to get certain properties
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    // replacing html placeholders with data.json
    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    // console.log(cardsHtml);

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output);

    // PRODUCTS
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found 404</h1>');
  }
});

// ********************* CREATE SERVER URL
server.listen(8000, '127.0.0.1', () => {
  console.log('Starting Server...');
});
