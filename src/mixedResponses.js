const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// get correct css file based on pathName
const getCSS = (request, response, pathName) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(fs.readFileSync(`${__dirname}/../client${pathName}`));
  response.end();
};

// get correct png based on pathName
const getPng = (request, response, pathName) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(fs.readFileSync(`${__dirname}/../client/media${pathName}`));
  response.end();
};

// get correct javascript file based on pathName
const getJS = (request, response, pathName) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(fs.readFileSync(`${__dirname}/../client/src${pathName}`));
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getPng,
  getJS,
};
