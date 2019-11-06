'use strict';

let client = require('../client');

function getPassword (id) {
  let sql = 'SELECT * FROM users WHERE id=$1';
  let safe = [id];

  return client.query(sql, safe);
}

module.exports = getPassword;
