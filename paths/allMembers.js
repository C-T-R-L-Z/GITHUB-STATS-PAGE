'use strict';

const superagent = require('superagent');

const issue = require('./issues');
const pr = require('./pullRequests');
const getInformation = require('./getPassword');

//Create an array of all members in an org
function allMembers (request, response) {

  let data = request.query;

  getInformation(data.count)
    .then(result => {
      let userData = result.rows[0];
      let url = `https://api.github.com/orgs/${data.orgName}/members`;

      superagent.get(url)
        .set('User-Agent', 'C-T-R-L-Z')
        .auth (userData.username, userData.password)
        .then (results => {

          let org = new OrgData(data.orgName);

          results.body.forEach(member => {
            org.members.push(new Member(member.login));
          });

          let fillData = [pr(org, userData), issue(org, userData)];

          Promise.all(fillData).then(() => {
            response.send(org);
          });
        });

    })
}

function Member (name) {
  this.name = name;
  this.pulls = 0;
  this.reviews = 0;
  this.openIssues = 0;
  this.assignedIssues = 0;
  this.merge = 0;
}

function OrgData(name, username = 'missing') {
  this.username = username;
  this.name = name;
  this.members = [];
  this.totalPulls = 0;
  this.reviews = 0;
  this.issues = 0;
  this.issuesAssigned = 0;
  this.merge = 0;
}

module.exports = allMembers;
