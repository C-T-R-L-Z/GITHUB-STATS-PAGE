'use strict';

var ctx = document.getElementById('myChart');

function collectInformation() {
  let url = `${window.location.origin}/stats`;

  $.ajax({
    url: url,
    method: 'get',
  })
    .then(results => {
      console.log(results)

      let users = results.body;
      let userArr = users.map(userData => new USER(userData));

      response.render('pages/stats', {userList: userArr,});
      
      let names = results.members.map(member => {
        return member.name
      })
      console.log(names)
      let openissues = results.members.map(member => {
        return member.openIssues
      })
      console.log(openissues)
      let assignedissues = results.members.map(member => {
        return member.assignedIssues
      })
      console.log(assignedissues)
      let orgName = results.name

      var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: names,
          datasets: [{
            label: '# of Open Issues',
            data: openissues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          title: {
            display: true,
            text: orgName + ' GitHub Stats'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    })
}

function USER (userData) {
  this.name = userData.results.member.name;
  this.openIssues = userData.results.members.openIssues;
  this.assignedIssues = userData.results.members.openIssues;
  
}

collectInformation();