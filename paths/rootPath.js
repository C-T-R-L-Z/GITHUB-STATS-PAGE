'use strict';

let client = require('../client');

function homePage (request, response) {
  response.render('pages/index');
  let sql = 'DELETE FROM users';
  client.query(sql).then(() => {
    let select = 'SELECT * FROM users';
    client.query(select).then(result => {
      console.log(result.rows);
    });
  });
}

module.exports = homePage;
