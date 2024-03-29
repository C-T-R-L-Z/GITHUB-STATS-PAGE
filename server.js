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
const displayList = require('./paths/displayList');
const statsPage = require('./paths/allMembers');
const aboutPage = require('./paths/aboutPage');
const displayPage = require('./paths/displayData');

//Route calls
app.get('/', homePage);
app.get('/orgslist', displayList);
app.get('/stats', statsPage);
app.get('/about', aboutPage);
app.post('/graphs', displayPage);

//Catch all for unused paths
app.get('*', error404);

//Dead end display message
function error404 (request, response) {
  response.status(404).render('pages/error', {serverError: false,});
}

//Link up DB
client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
  })
  .catch(err => console.error(err));
