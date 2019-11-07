'use strict';

// var ctx = document.getElementById('myChart');

function collectInformation() {
  let url = `${window.location.origin}/stats`;
  let inputs = $('input');
  $.ajax({
    url: url,
    method: 'get',
    data: { orgName: inputs[1].value, count: inputs[0].value, },
  })
    .then(results => {
      console.log(results)
      let orgName = results.name

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

      let pulls = results.members.map(member => {
        return member.pulls
      })
      console.log(pulls)

      var ctx = document.getElementById('openChart');
      var openChart = new Chart(ctx, {
        type: 'pie',
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
            text: orgName + ' # of Open Issues'
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

      var ctx = document.getElementById('assigned');
      var assigned = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: names,
          datasets: [{
            label: '# of Assigned Issues',
            data: assignedissues,
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
            text: orgName + ' # of Assigned Issues'
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

      var ctx = document.getElementById('pullsChart');
      var pullsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: names,
          datasets: [{
            label: '# of Pulls',
            data: pulls,
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
            text: orgName + ' # of Pulls'
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



collectInformation();