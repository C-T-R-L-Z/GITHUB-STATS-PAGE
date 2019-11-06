'use strict';

const superagent = require('superagent');

function findPR(orgData) {

  let url = `https://api.github.com/orgs/C-T-R-L-Z/repos`;

  return superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth(process.env.username, process.env.password)
    .then(reposList => {

      let repos = reposList.body;

      let repoCalls = repos.map(repo =>{
        let url = `https://api.github.com/repos/C-T-R-L-Z/GITHUB-STATS-PAGE/pulls?state=all`;

        return superagent.get(url)
          .set('User-Agent', 'C-T-R-L-Z')
          .auth(process.env.username, process.env.password);

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
