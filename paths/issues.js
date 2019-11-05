'use strict';

const superagent = require('superagent');

function getIssues (request, response, orgData) {

  let url = `https://api.github.com/orgs/c-t-r-l-z/issues?filter=all&status=all`;

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth (process.env.username, process.env.password)
    .then (results => {
      let issuesArr = results.body;

      orgData.issues = issuesArr.length;
      issuesArr.forEach(issue => {

        orgData.issuesAssigned += handleAssingees(issue, orgData.members);

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

function handleAssingees (issue, people) {
  let issuesAssigned = 0;
  issue.assignees.forEach(assignee => {
    issuesAssigned = 1;
    people.forEach(person => {
      if (assignee.login === person.name) {
        person.assignedIssues++;
      }
    });
  });
  return issuesAssigned;
}

module.exports = getIssues;
