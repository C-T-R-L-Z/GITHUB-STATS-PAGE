'use strict';

const superagent = require('superagent');

function homePage (request, response) {
  response.send('alive');
}

module.exports = homePage;
