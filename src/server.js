const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring');
const mixedHandler = require('./mixedResponses.js');
const jsonHandler = require('./jsonResponses.js');

const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    handler(request, response, bodyParams);
  });
};

const handlePost = (request, response) => {
  parseBody(request, response, jsonHandler.addBouquet);
}; // '/getUsers': jsonHandler.getUsers,

const urlStruct = {
  GET: {
    '/': mixedHandler.getIndex,
    '/style.css': mixedHandler.getCSS,
    '/skeleton.css': mixedHandler.getCSS,
    '/main.js': mixedHandler.getJS,
    '/getBouquet': jsonHandler.getBouquet,
    '/rose1.png': mixedHandler.getPng,
    '/rose2.png': mixedHandler.getPng,
    '/cherry1.png': mixedHandler.getPng,
    '/cherry2.png': mixedHandler.getPng,
    notFound: jsonHandler.notFound,
  },
  POST: {
    '/addBouquet': handlePost,
  },
};

const onRequest = (request, response) => {
  // parse info from url
  const parsedUrl = url.parse(request.url);

  // grab params
  let params = query.parse(parsedUrl.query);

  // handle the request. If no handler found, use notFound
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, parsedUrl.pathname, params);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// start server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
