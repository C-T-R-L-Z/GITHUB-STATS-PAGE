'use strict';

function checkCookies (request) {

  let inputs = request.headers.cookie.split(';');


  let inputData = new CookieData (inputs[0].slice(inputs[0].indexOf('=') + 1),inputs[1].slice(inputs[1].indexOf('=') + 1));
  if(inputs[2]) {
    inputData.org = inputs[2].slice(inputs[2].indexOf('=') + 1);
  }

  return inputData;

}

function CookieData (username, key) {
  this.username = username;
  this.key = key;
}

module.exports = checkCookies;
