'use strict';

const superagent = require('superagent');

const issue = require('./issues');
const pr = require('./pullRequests');
const checkCookies = require('./checkCookies');
const updateOrgs = require('./updateOrgs');

//Create an array of all members in an org
function allMembers (request, response) {

  //If the user is using their own data use that else use default
  let userData;
  if(!request.headers.cookie) {
    userData = {username: process.env.USERNAME, key: process.env.PERSONAL_KEY,}
  } else {
    userData = checkCookies(request);
  }

  //Collects the org name
  let data = request.query;
  let url = `https://api.github.com/orgs/${data.orgName}/members`;

  //Create the object for the selected Org
  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth (userData.username, userData.key)
    .then (results => {

      //Create new Org Obj
      let org = new OrgData(data.orgName);
      org.calls++;

      results.body.forEach(member => {
        org.members.push(new Member(member.login));
      });

      //Collect data on pullrequests and issues for the org
      let fillData = [pr(org, userData), issue(org, userData)];

      //Run all promises at once
      Promise.all(fillData).then(() => {
        response.send(org);
        updateOrgs(org, userData.username);
      });
    });
}

//Constructor function of a member object
function Member (name) {

  this.name = name;
  this.pulls = 0;
  this.reviews = 0;
  this.openIssues = 0;
  this.assignedIssues = 0;
  this.merge = 0;

}

//constructor for the orginazation object
function OrgData(name) {
  this.calls = 0;
  this.name = name;
  this.members = [];
  this.totalPulls = 0;
  this.reviews = 0;
  this.issues = 0;
  this.issuesAssigned = 0;
  this.merge = 0;

}

module.exports = allMembers;
