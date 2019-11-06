'use strict';

const getIssues = require('/issues.js')


var labels = ['Pull', 'Merge', 'Blah'];
var dataCalories = [];
var dataDistance = [];

function printProfile() {
  var h2 = document.createElement('h2');
  userInfo.appendChild(h2);
  h2.textContent = 'Name: ' + currentUser.name;
  userInfo.appendChild(h2);

//   var h3 = document.createElement('h3');
//   userInfo.appendChild(h3);
//   h3.textContent = 'Age: ' + currentUser.age;

//   h3 = document.createElement('h3');
//   userInfo.appendChild(h3);
//   h3.textContent = 'Current Weight: ' + currentUser.currentWeight + 'lbs';

//   h3 = document.createElement('h3');
//   userInfo.appendChild(h3);
//   h3.textContent = 'Target Weight: ' + currentUser.targetWeight + 'lbs';

//   h3 = document.createElement('h3');
//   userInfo.appendChild(h3);
//   h3.textContent = 'Calories to be burnt: ' + (currentUser.currentWeight - currentUser.targetWeight) * 3500 + ' calories';
// }

// function generateData() {
//   var activities = currentUser.activityList;
//   console.log(activities);
//   var sumWalkCal = 0;
//   var sumRunCal = 0;
//   var sumBikeCal = 0;
//   var sumWalkDis = 0;
//   var sumRunDis = 0;
//   var sumBikeDis = 0;

//   for (var i = 0; i < activities.length; i++) {
//     if (activities[i].type === 'walk') {
//       sumWalkCal += activities[i].calorieCount();
//       sumWalkDis += activities[i].distance;
//     } else if (activities[i].type === 'run') {
//       sumRunCal += activities[i].calorieCount();
//       sumRunDis += activities[i].distance;
//     } else if (activities[i].type === 'bike') {
//       sumBikeCal += activities[i].calorieCount();
//       sumBikeDis += activities[i].distance;
//     }
//   }
//   dataCalories = [sumWalkCal, sumRunCal, sumBikeCal];
//   dataDistance = [sumWalkDis, sumRunDis, sumBikeDis];
// }

function renderPullRequest() {

  var ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Pull Request',
        data: dataCalories,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(0, 100, 0, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(0, 100, 0, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function renderMergeRequest() {

  var ctx = document.getElementById('chart1').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Merge Request',
        data: dataDistance,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(0, 100, 0, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(0, 100, 0, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function runStatsPage() {
  printProfile();
  generateData();
  renderCalorieReport();
  renderDistanceReport();
}

runStatsPage();