'use strict';

const superagent = require('superagent');

function getAssignees (request, response) {

  let url = `https://api.github.com/orgs/C-T-R-L-Z/issues?filter=all&status=all`;

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth (process.env.username, process.env.password)
    .then (results => {
      let issuesArr = results.body
      let assignees = [];
      issuesArr.forEach(issue => {
        let found = false;
        assignees.forEach(person=> {
          if (issue.assignees.login === person.name) {
            person.assignee++;
            found = true;
          }
        })
        if (!found) {
          assignees.push({name:issue.assignees.login, assignedIssue:1})
        }
      });
      console.log(assignees)
    })
    .catch(err => console.error(err));
}

module.exports = getAssignees;
