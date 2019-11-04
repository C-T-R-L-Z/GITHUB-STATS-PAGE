'use strict';

const express = require('express');
const superagent = require('superagent');
require('dotenv').config();
require('ejs');
const methodOverride = require('method-override');

const app = express();

const PORT = process.env.PORT || 3002;
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => { throw err; });
client.connect();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}))

app.get('*', (request, response) => {
  response.status(404).send('this route does not exist');
})


app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
