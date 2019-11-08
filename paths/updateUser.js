'use strict';

const client = require('../client');

function updateDB (data) {

  let userSQL = `INSERT INTO siteStats (username, apiCalls, time) VALUES ($1, $2, $3) RETURNING id;`;
  let safe = [data.username, data.call, (new Date).getTime()];
  client.query(userSQL, safe)
    .catch(err => console.error(err));
}

module.exports = updateDB;
