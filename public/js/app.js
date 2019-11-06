'use strict';

// var ctx = document.getElementById('myChart');

function collectInformation() {
  let url = `${window.location.origin}/stats`;

  $.ajax({
    url: url,
    method: 'get',
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

      let graphdata = openissues
      let graphlabel = '# of Open Issues'
      let graphtype = 'pie'
      getGraph()

      $('#list').on('change', function () {
        if ($(this).val() === '1') {
          resetCanvas();
          graphdata = openissues;
          graphlabel = '# of Open Issues'
          graphtype = 'pie'
          getGraph(graphdata);
        }
        if ($(this).val() === '2') {
          resetCanvas();
          graphdata = assignedissues;
          graphlabel = '# of Assigned Issues'
          graphtype = 'radar'
          getGraph(graphdata);
        }
        if ($(this).val() === '3') {
          resetCanvas();
          graphdata = pulls;
          graphlabel = '# of Pulls'
          graphtype = 'doughnut'
          getGraph(graphdata);
        }
      });

      function resetCanvas() {
        $('#myChart').remove();
        $('#canvas').append('<canvas id="myChart" width="400" height="400"></canvas>');
      }

      function getGraph() {
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
          type: graphtype,
          data: {
            labels: names,
            datasets: [{
              label: graphlabel,
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