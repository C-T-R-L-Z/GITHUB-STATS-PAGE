'use strict';
//This will contain a function to hash and retreve the users password

function getPassword (userName) {
  let sql =  `GET password WHERE id=$1`;
  let safeValue = [userName];

  
}


