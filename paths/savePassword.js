'use strict';

let client = require('../client');

function savePassword (obj) {
  let sql = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
  let safe = [obj.name, obj.password];

  return client.query(sql, safe).then(result => result);
}

module.exports = savePassword;
