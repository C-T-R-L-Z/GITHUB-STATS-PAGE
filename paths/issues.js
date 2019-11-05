'use strict';

const superagent = require('superagent');

function getIssues (request, response) {

  let url = `https://api.github.com/orgs/C-T-R-L-Z/issues?filter=all&status=all`;

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth (process.env.username, process.env.password)
    .then (results => {
      let issuesArr = results.body
      let openIssues = [];
      issuesArr.forEach(issue => {
        let found = false;
        openIssues.forEach(person=> {
          if (issue.user.login === person.name) {
            person.issue++;
            found = true;
          }
        })
        if (!found) {
          openIssues.push({name:issue.user.login, issue:1})
        }
      });
      console.log(openIssues)
    })
    .catch(err => console.error(err));
}

module.exports = getIssues;
