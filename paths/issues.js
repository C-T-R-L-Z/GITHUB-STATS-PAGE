'use strict';


function getIssues (request, response) {

  console.log(request.body.search);

  let url = `https://api.github.com/orgs/C-T-R-L-Z/issues?filter=all`;

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth (process.env.username, process.env.password)
    .then (results => console.log(results.body))

    .catch(err => superagnetError(err, response));
}

module.exports = getIssues;
