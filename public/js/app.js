'use strict'

$(".form1").hide();

$(".formButton").on('click', bottomHandler);

function bottomHandler(event) {
  console.log(event.target);
  $(event.target).next().toggle();
}


