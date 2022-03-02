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

// responds with no json obj (HEAD)
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getBouquet = (request, response, url, data) => {
  const { name } = data;
  if (!bouquets[name]) {
    const responseJSON = {
      message: 'Bouquet not found.',
      id: 'bouquetNotFound',
    };
    return respondJSON(request, response, 404, responseJSON);
  }

  return respondJSON(request, response, 200, { bouquet: bouquets[name].bouquet });
};

const getBouquetMeta = (request, response, url, data) => {
  const { name } = data;
  if (!bouquets[name]) {
    return respondJSONMeta(request, response, 404);
  }

  return respondJSON(request, response, 200);
};

const addBouquet = (request, response, data) => {
  // return 400 if bad data
  if (!data.name) {
    const responseJSON = {
      message: 'Error: No text was entered.',
      id: 'noNameReceived',
    };
    return respondJSON(request, response, 400, responseJSON);
  }
  // update existing bouquet
  if (bouquets[data.name]) {
    bouquets[data.name].bouquet = data.bouquet;
    return respondJSONMeta(request, response, 204);
  }
  // create new bouquet
  bouquets[data.name] = {
    name: data.name,
    bouquet: data.bouquet,
  };
  const responseJSON = {
    message: 'Created Successfully.',
  };
  return respondJSON(request, response, 201, responseJSON);
};

// not used
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getBouquet,
  getBouquetMeta,
  addBouquet,
  notFound,
};
