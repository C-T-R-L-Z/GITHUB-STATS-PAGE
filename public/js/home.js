'use strict';

$('#edit').on('click', createCookie);
$('#showForm').on('click', showForm);

function showForm(event) {
  $('#keyForm').show();
}

function createCookie (event) {
  const entries = $('#keyForm input');
  document.cookie = `username=${entries[0].value};`;
  document.cookie = `key=${entries[1].value};`;
}

//action="/orgslist" method="post"
