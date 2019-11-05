'use strict';

const superagent = require('superagent');

function findRepos(request, response) {
  let url = `https://api.github.com/orgs/C-T-R-L-Z/repos`

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth(process.env.username, process.env.password)
    .then(results => {
      let reposArr = []
      results.body.forEach(repo => {
        reposArr.push(repo.name)
      })
      return reposArr
    })
}

function findPR(request, response) {

  let url = 'https://api.github.com/repos/C-T-R-L-Z/GITHUB-STATS-PAGE/pulls?state=all'
  // let repos = findRepos()
  // repos.forEach(repo => {
  //   let url = `https://api.github.com/repos/C-T-R-L-Z/${repo}/pulls?state=all`;
  // })

  superagent.get(url)
    .set('User-Agent', 'C-T-R-L-Z')
    .auth(process.env.username, process.env.password)
    .then(results => {
      let prArr = [];
      results.body.forEach(pr => {
        let found = false;
        prArr.forEach(person=> {
          if (pr.user.login === person.name) {
            person.pr++;
            found = true;
          }
        })
        if (!found) {
          prArr.push({name:pr.user.login, pr:1})
        }
      });
      console.log(prArr)
    })
    .catch(err => console.error(err));
}


module.exports = findRepos;
module.exports = findPR;

