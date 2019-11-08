'use strict';

const client = require('../client');

function updateDB (data, username) {
  let userSQL = `INSERT INTO siteStats (username, apiCalls, time) VALUES ($1, $2, $3);`;
  let safe = [username, data.calls, (new Date).getTime()];
  client.query(userSQL, safe)
    .then(() => {
      let orgSQL = `INSERT INTO orgs (orgName, time) VALUES ($1, $2);`;
      let safe = [data.name, (new Date).getTime()];
      client.query(orgSQL, safe)
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

module.exports = updateDB;
