'use strict';

const superagent = require('superagent');

function findReviews(orgData) {

  let url = `https://api.github.com/orgs/${orgData.name}/repos`;

  return superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth(process.env.username, process.env.password)
    .then(reposList => {

      let repos = reposList.body;

      let repoCalls = repos.map(repo =>{
        let url = `https://api.github.com/repos/C-T-R-L-Z/GITHUB-STATS-PAGE/pulls/${pullnum}/reviews`;

        let pullnum = repo.map(pull =>{
          let pullnum = 
        })

        return superagent.get(url)
          .set('User-Agent', 'C-T-R-L-Z')
          .auth(process.env.username, process.env.password);

      });

      return Promise.all(repoCalls)
        .then(results => {
          results.forEach(repo => {
            console.log(repo.body);
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

module.exports = findReviews;