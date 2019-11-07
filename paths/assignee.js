'use strict';

const superagent = require('superagent');

function getAssignees(request, response) {
  let date = new Date();
  date.setDate(date.getDate() - 7)
  let d = date.toISOString()
  let url = `https://api.github.com/orgs/C-T-R-L-Z/issues?filter=all&status=all&since=${d}`;

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth(process.env.username, process.env.password)
    .then(results => {
      let issuesArr = results.body
      let assigneeResults = []
      issuesArr.forEach(issue => {
        issue.assignees.forEach(assignee => {
          let found = false
          assigneeResults.forEach(person => {
            if (assignee.login === person.name) {
              person.assigned++;
              found = true;
            }
          })
          if (!found) {
            assigneeResults.push({ name: assignee.login, assigned: 1 })
          }
        })
      })
      console.log(assigneeResults)
    })
    .catch(err => console.error(err));
}

module.exports = getAssignees;
