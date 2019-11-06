'use strict';

var ctx = document.getElementById('myChart');

function collectInformation() {
  let url = `${window.location.origin}/stats`;
  let inputs = $('input');
  $.ajax({
    url: url,
    method: 'get',
    data: {orgName: inputs[1].value, count: inputs[0].value,},
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

      let graphdata = []
      // getGraph()

      $('#list').on('change', function () {
        if ($(this).val() === '1') {
          graphdata = openissues
          getGraph(graphdata)
        }
        if ($(this).val() === '2') {
          graphdata = assignedissues
          getGraph(graphdata)
        }
        if ($(this).val() === '3') {
          graphdata = pulls
          getGraph(graphdata)
        }
      });

      function getGraph() {
        var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: names,
            datasets: [{
              label: '# of Open Issues',
              data: graphdata,
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
      }

    })
}



collectInformation();