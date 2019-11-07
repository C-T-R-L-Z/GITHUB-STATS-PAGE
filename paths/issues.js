'use strict';

const superagent = require('superagent');

function getIssues(orgData, userData) {

  //Find the date of 1 week ago to limit the search range
  let date = new Date();
  date.setDate(date.getDate() - 7);
  let d = date.toISOString();

  let url = `https://api.github.com/orgs/${orgData.name}/issues?filter=all&status=all&since=${d}`;

  //Returning the superagent call to be used in a Promise.all
  return superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth(userData.username, userData.key)
    .then(results => {
      let issuesArr = results.body;

      orgData.issues = issuesArr.length;
      issuesArr.forEach(issue => {

        orgData.issuesAssigned += handleAssingees(issue, orgData.members);

        orgData.members.forEach(person => {

          if (issue.user.login === person.name) {
            person.openIssues++;
          }
        });
      });
    })
    .catch(err => console.error(err));
}

//Assigness is an offshoot of issues but handeled at the same time to limit API calls
function handleAssingees(issue, people) {

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
