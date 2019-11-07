'use strict';

const superagent = require('superagent');

function displayList(request, response, userInfo = {username: process.env.USERNAME, key: process.env.PERSONAL_KEY,}) {
  //Needs the users name and password as an input in the params

  let url = `https://api.github.com/user/orgs`;

  superagent
    .get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth(userInfo.username, userInfo.key)
    .then(results => {
      let orgs = results.body;
      let orgArr = orgs.map(orgData => new ORG(orgData));

      response.render('pages/searches/orgs', {
        orgList: orgArr,
      });
    })

    .catch(err => console.error(err));
}

function ORG(orgData) {
  this.login = orgData.login;
  this.avatar_url = orgData.avatar_url;
  this.id = orgData.id;
  this.description = orgData.description;
}

module.exports = displayList;
