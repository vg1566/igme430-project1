const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring');
const mixedHandler = require('./mixedResponses.js');
const jsonHandler = require('./jsonResponses.js');

const handlePost = () => {

}; //'/getUsers': jsonHandler.getUsers,

const urlStruct = {
    GET: {
      '/': mixedHandler.getIndex,
      '/style.css': mixedHandler.getCSS,
      '/skeleton.css': mixedHandler.getCSS,
      '/main.js': mixedHandler.getJS,
      '/rose.png': mixedHandler.getPng,
      notFound: jsonHandler.notFound,
    },
    POST: {
      '/addUser': handlePost,
    },
  };

  
const onRequest = (request, response) => {
    // parse info from url
    const parsedUrl = url.parse(request.url);
  
    // handle the request. If no handler found, use notFound
    if (urlStruct[request.method][parsedUrl.pathname]) {
      urlStruct[request.method][parsedUrl.pathname](request, response, parsedUrl.pathname);
    } else {
      urlStruct[request.method].notFound(request, response);
    }
  };
  
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// start server
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
  });