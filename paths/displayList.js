'use strict';

const superagent = require('superagent');

function displayList (request, response) {
  //Needs the users name and password as and input in the params

  response.send('Display list of org options for farther details');

  let org = 'C-T-R-L-Z';
  let url = `https://api.github.com/orgs/C-T-R-L-Z/issues?filter=all`;

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth (process.env.username, process.env.password)
    .then (results => console.log(results.body))

    .catch(err => console.error(err));
}

module.exports = displayList;
