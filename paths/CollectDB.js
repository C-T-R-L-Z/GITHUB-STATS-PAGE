'use strict';

const client = require('../client');

function collectData (request, response) {
  let usersSQL = 'SELECT * FROM users';

  client.query(usersSQL)
    .then(userResults => {

      let orgSQL = 'SELECT * FROM siteStats';
      client.query(orgSQL)
        .then(orgResults => {
          computeData(response, userResults.rows, orgResults.rows);
        });
    });
}

function computeData (response, userData, orgData) {
  let data = {};

  data = handleUsers(data, userData);
  // handleOrgs(data, orgData);

  response.send(data);
}

function handleUsers(data, userData) {
  let names = [];
  userData.forEach(user => {
    if (!names.includes(user.name)) {
      names.push(user.name);
    }
  });
  data.name = names;
  return data;
}

module.exports = collectData;
