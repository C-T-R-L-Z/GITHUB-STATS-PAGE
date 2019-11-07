'use strict';

$('#edit').on('click', createCookie);
$('#showForm').on('click', showForm);
$('#default').on('click', removeCookies);

function showForm(event) {
  $('#keyForm').toggle();
}

function createCookie(event) {
  const entries = $('#keyForm input');
  document.cookie = `username=${entries[0].value};`;
  document.cookie = `key=${entries[1].value};`;
}

function removeCookies() {
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

$('#show').on('click', function () {
  $('#ptag').toggle();
});

$('#atag').on('click', function (e) {
  e.preventDefault();
  var url = $(this).attr('href');
  window.open(url, '_blank');
});
