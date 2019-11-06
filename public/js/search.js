'use strict';

$('button').on('click', whichButton);

function whichButton (event) {
  console.log(this.value);
}
