'use strict';

const superagent = require('superagent');

function findPR(request, response, orgData) {

  let url = `https://api.github.com/orgs/C-T-R-L-Z/repos`;

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth(process.env.username, process.env.password)
    .then(results => {
      console.log(results.body);
      // let repoName = results.body.map()
    });
}



module.exports = findPR;

