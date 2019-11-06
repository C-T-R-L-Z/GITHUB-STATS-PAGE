'use strict';

require('dotenv').config();

const express = require('express');
require('ejs');
const methodOverride = require('method-override');

const app = express();

const PORT = process.env.PORT || 3002;

const client = require('./client');



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
const statsPage = require('./paths/allMembers');
const aboutPage = require('./paths/aboutPage');

//Route calls
app.get('/', homePage);
app.get('/pr', PRresults);
app.post('/orgslist', displayList);
app.get('/issues', issuesResults);
app.get('/assign', assigneesResults);
app.get('/stats', statsPage);
app.get('/about', aboutPage);
app.get('/graphs', displayPage);

function displayPage(req, res) {
  res.render('pages/stats/stats');
}

// app.get('/data', dataPage);

app.get('*', error404);

function error404 (request, response) {
  response.status(404).send('404 not found');
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
  })
  .catch(err => console.error(err));
