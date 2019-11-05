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
const issuesResults = require('./paths/issues');
const assigneesResults = require('./paths/assignee');


//Route calls
app.get('/', homePage);
app.get('/pr', PRresults);
app.post('/orgslist', displayList);
app.get('/issues', issuesResults);
app.get('/assign', assigneesResults);


// app.get('/data', dataPage);

app.get('*', error404);

function error404 (request, response) {
  response.status(404).send('404 not found');
}

app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
