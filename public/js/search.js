'use strict';

$('button').on('click', whichButton);

function whichButton (event) {
  console.log(this.value);
  // let names = {orgName: this.value,username: $('input')[0].value, };
  
}
