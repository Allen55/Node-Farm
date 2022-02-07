const fs = require('fs');
const http = require('http');
const url = require('url');


const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
}

const tempOverview = fs.readFileSync("./starter/templates/template-overview.html", "utf-8");
const tempCard = fs.readFileSync("./starter/templates/template-card.html", "utf-8");
const tempProduct = fs.readFileSync("./starter/templates/product.html", "utf-8");

const data = fs.readFileSync("./starter/dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    //Overview Page
    if(pathName === "/" || pathName === "/overview"){
      res.writeHead(200, { "Content-type": "html"});
      const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el))
      res.end(tempOverview); 
    } else if (pathName === "/product") {
        res.end("THis is the PRODUCT")
    } else if (pathName === "/api") {
        res.writeHead(200, { "Content-type": "application/json"});
        res.end(data);
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello world"
        });
        res.end("<h1>Page not found!</h1>")
    }
    console.log(pathName);
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
});