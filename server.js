'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
require('ejs');
const methodOverride = require('method-override');

const app = express();

const PORT = process.env.PORT || 3002;
const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL);
// client.on('error', err => { throw err; });
// client.connect();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

//import file paths
const homePage = require('./paths/rootPath');
const PRresults = require('./paths/pullRequests');
const displayList = require('./paths/displayList');
//Route calls
app.get('/', homePage);
app.get('/pr', PRresults);
app.get('/orgsList', displayList);
// app.get('/data', dataPage);

app.get('*', error404);

function apiCall (request, response) {

  let org = 'C-T-R-L-Z';
  let url = `https://api.github.com/orgs/C-T-R-L-Z/issues?filter=all`;

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth (process.env.username, process.env.password)
    .then (results => console.log(results.body))

    .catch(err => superagnetError(err, response));
}

function superagnetError (error, response) {
  console.error(error);
  response.send('error').status(500);
}

function error404 (request, response) {
  response.status(404).semd('404 not found');
}

app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
