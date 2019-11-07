'use strict';

const superagent = require('superagent');

function findPR(orgData) {

  let url = `https://api.github.com/orgs/${orgData.name}/repos`;

  return superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth(process.env.USERNAME, process.env.PERSONAL_KEY)
    .then(reposList => {

      let repos = reposList.body;

      let repoCalls = repos.map(repo =>{
        let url = `https://api.github.com/repos/${orgData.name}/${repo.name}/pulls?state=all`;

        return superagent.get(url)
          .set('User-Agent', 'C-T-R-L-Z')
          .auth(process.env.USERNAME, process.env.PERSONAL_KEY);

      });

      return Promise.all(repoCalls)
        .then(results => {
          results.forEach(repo => {

            orgData.totalPulls += repo.body.length;
            repo.body.forEach(pullRequest => {

              orgData.members.forEach(person => {

                if (person.name === pullRequest.user.login) {
                  person.pulls++;
                }

              });
            });
          });

          return orgData;

        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

module.exports = findPR;
