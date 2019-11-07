'use strict';

function displayPage(req, res) {
  let data = req.body;
  res.render('pages/stats/stats', {orgName: data.orgName, count: data.count,});
}

module.exports = displayPage;
