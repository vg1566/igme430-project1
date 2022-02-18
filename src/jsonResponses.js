// const fs = require('fs');

const bouquets = {};

// responds with json obj (GET)
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const getBouquet = (request, response, url, data) => {
    let name = data.name;
    if(!bouquets[name]) {
        return respondJSON(request, response, 404, { message: 'Bouquet not found.' });
    }
  
    return respondJSON(request, response, 200, { bouquet: bouquets[name].bouquet });
  };

const addBouquet = (request, response, data) => {
  let responseJSON;
  // update existing bouquet
  if (bouquets[data.name]) {
    bouquets[data.name].bouquet = data.bouquet;
    responseJSON = {
      message: 'Updated Successfully.',
    };
    return respondJSON(request, response, 201, responseJSON); //change to no json later (204 status code)
  }
  // create new bouquet
  bouquets[data.name] = {
      name: data.name,
      bouquet: data.bouquet,
  }
  responseJSON = {
    message: 'Created Successfully.',
  };
  return respondJSON(request, response, 201, responseJSON);
};

const notFound = (request, response) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
    return respondJSON(request, response, 404, responseJSON);
  };

module.exports = {
    getBouquet,
  addBouquet,
  notFound,
};
