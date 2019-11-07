'use strict';

const superagent = require('superagent');
const savePassword = require('./savePassword');

function displayList(request, response) {
  //Needs the users name and password as an input in the params

  let save = [savePassword(request.body)];

  Promise.all(save)
    .then(result => {
      let url = `https://api.github.com/user/orgs`;

      let userid = result[0].rows[0];

      superagent
        .get(url)
        .set('User-Agent', 'C-T-R-L-Z')
        .auth(process.env.USERNAME, process.env.PERSONAL_KEY)
        .then(results => {
          let orgs = results.body;
          let orgArr = orgs.map(orgData => new ORG(orgData));

          response.render('pages/searches/orgs', {
            orgList: orgArr,
            username: userid.id,
          });
        })

        .catch(err => console.error(err));
    });
}

function ORG(orgData) {
  this.login = orgData.login;
  this.avatar_url = orgData.avatar_url;
  this.id = orgData.id;
  this.description = orgData.description;
}

module.exports = displayList;
