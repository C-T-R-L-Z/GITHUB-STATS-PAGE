'use strict';

const superagent = require('superagent');

function getIssues (request, response, orgData) {

  let url = `https://api.github.com/orgs/c-t-r-l-z/issues?filter=all&status=all`;

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth (process.env.username, process.env.password)
    .then (results => {
      let issuesArr = results.body;
      console.log(results.body);
      orgData.issues = issuesArr.length;
      issuesArr.forEach(issue => {

        orgData.members.forEach(person=> {

          if (issue.user.login === person.name) {
            person.openIssues++;
          }

        });

      });
      response.send(orgData);
    })
    .catch(err => console.error(err));
}

module.exports = getIssues;
