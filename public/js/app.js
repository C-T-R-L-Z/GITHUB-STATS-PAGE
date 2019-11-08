'use strict';

function collectInformation() {
  let url = `${window.location.origin}/stats`;
  let inputs = $('input');
  $.ajax({
    url: url,
    method: 'get',
    data: { orgName: inputs[1].value, count: inputs[0].value }
  }).then(results => {
    console.log(results);
    let orgName = results.name;

    let names = results.members.map(member => {
      return member.name;
    });
    console.log(names);

    let openissues = results.members.map(member => {
      return member.openIssues;
    });
    console.log(openissues);

    let assignedissues = results.members.map(member => {
      return member.assignedIssues;
    });
    console.log(assignedissues);

    let pulls = results.members.map(member => {
      return member.pulls;
    });
    console.log(pulls);

    function dynamicColors() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)';
    }

    function poolColors() {
      var pool = [];
      for (let i = 0; i < names.length; i++) {
        pool.push(dynamicColors());
      }
      return pool;
    }

    var ab = poolColors();
    var ctx = document.getElementById('openChart');
    var openChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: names,
        datasets: [
          {
            label: '# of Open Issues',
            data: openissues,
            backgroundColor: ab,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        pieceLabel: {
          render: 'percentage',
          fontColor: 'black',
          fontSize: 14
        },
        legend: {
          display: true,
          labels: {
            fontSize: 50,

            padding: 10
          }
        },

        title: {
          display: true,
          text: 'Open Issues of ' + `${orgName}`,
          position: 'top',
          fontSize: 50
        },

        label: {
          display: true,
          fontSize: 50
        },

        tooltips: {
          enabled: true,
          titleFontSize: 80,
          bodyFontSize: 80
        },

        scales: {
          // yAxes: [{
          //     barPercentage: 1.0,
          //     gridLines: {
          //         display: true
          //     },
          //     ticks: {
          //       "enabled": true,
          //       titleFontSize: 80,
          //       bodyFontSize: 80
          //     }
          // }],
          xAxes: [
            {
              gridLines: {
                display: true
              },
              ticks: {
                min: 0,
                max: 100,
                stepSize: 1
              }
            }
          ]
        }
      }
    });

    var ctx = document.getElementById('assigned');
    var assigned = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: names,
        datasets: [
          {
            label: '# of Assigned Issues',
            data: assignedissues,
            backgroundColor: ab,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        pieceLabel: {
          render: 'percentage',
          fontColor: 'black',
          fontSize: 14
        },
        legend: {
          display: true,
          labels: {
            fontSize: 50,

            padding: 10
          }
        },
        title: {
          display: true,
          text: 'Assigned Issues of ' + `${orgName}`,
          position: 'top',
          fontSize: 50
        },

        label: {
          display: true,
          fontSize: 50
        },
        tooltips: {
          enabled: true,
          titleFontSize: 80,
          bodyFontSize: 80
        },
        scales: {
          yAxes: [
            {
              barPercentage: 1.0,
              gridLines: {
                display: true
              },
              ticks: {
                fontSize: 10,
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true
              },
              ticks: {
                min: 0,
                max: 100,
                stepSize: 1
              }
            }
          ]
        }
      }
    });
    var ctx = document.getElementById('pullsChart');
    var pullsChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: names,
        datasets: [
          {
            label: '# of Pulls',
            data: pulls,
            backgroundColor: ab,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        pieceLabel: {
          render: 'percentage',
          fontColor: 'black',
          fontSize: 14
        },
        legend: {
          display: true,
          labels: {
            fontSize: 50,

            padding: 10
          }
        },
        title: {
          display: true,
          text: 'PR of ' + `${orgName}`,
          position: 'top',
          fontSize: 50
        },
        label: {
          display: true,
          fontSize: 50
        },
        tooltips: {
          enabled: true,
          titleFontSize: 80,
          bodyFontSize: 80
        },
        scales: {
          yAxes: [
            {
              barPercentage: 1.0,
              gridLines: {
                display: true
              },
              ticks: {
                fontSize: 10,
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true
              },
              ticks: {
                min: 0,
                max: 100,
                stepSize: 1
              }
            }
          ]
        }
      }
    });
    var ctx = document.getElementById('comparision');
    var comparision = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [
          {
            label: '# of PR',
            data: pulls,
            backgroundColor: ab
          },
          {
            label: '# of Assigned Issuses',
            data: assignedissues,
            backgroundColor: ab
          },
          {
            label: '# of Open Issuses',
            data: openissues,
            backgroundColor: ab
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Comparision Table ' + `${orgName}`,
          position: 'top',
          fontSize: 10
        },
        label: {
          display: true,
          fontSize: 50
        },
        tooltips: {
          enabled: true,
          titleFontSize: 20,
          bodyFontSize: 20
        },
        scales: {
          yAxes: [
            {
              barPercentage: 1.0,
              gridLines: {
                display: true
              },
              ticks: {
                fontSize: 5,
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true
              },
              ticks: {
                min: 0,
                max: 100,
                stepSize: 0.5
              }
            }
          ]
        }
      }
    });
  });
}
collectInformation();
