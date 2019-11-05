'use strict';

function collectInformation () {
  let url = `${window.location.origin}/stats`;

  $.ajax({
    url:url,
    method: 'get',
  })
    .then(results => {
      console.log(results);
    });
}

collectInformation();
