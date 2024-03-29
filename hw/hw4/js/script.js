
// Load CSV file
d3.csv("data/fifa-world-cup.csv", function (d) {
  // Convert numeric values to 'numbers'
  d.year = +d.YEAR;
  d.teams = +d.TEAMS;
  d.matches = +d.MATCHES;
  d.goals = +d.GOALS;
  d.avg_goals = +d.AVERAGE_GOALS;
  d.attendance = +d.AVERAGE_ATTENDANCE;
  // Lat and Lons of gold and silver medals teams
  d.win_pos = [+d.WIN_LON, +d.WIN_LAT];
  d.ru_pos = [+d.RUP_LON, +d.RUP_LAT];

  //Break up lists into javascript arrays
  d.teams_iso = d3.csvParse(d.TEAM_LIST).columns;
  d.teams_names = d3.csvParse(d.TEAM_NAMES).columns;
  return d;
}).then(function(allData) {

  /* Create infoPanel, barChart and Map objects  */
  let infoPanel = new InfoPanel();
  let worldMap = new Map();

  /* DATA LOADING */
  //Load in json data to make map
  d3.json("data/world.json")
    .then(function(world) {
      worldMap.drawMap(world);
    });

  // Define this as a global variable
  window.barChart = new BarChart(worldMap, infoPanel, allData);

  // Draw the Bar chart for the first time
  let list = document.getElementById('dataset');
  barChart.updateBarChart(list[list.selectedIndex].value);
});

function chooseData() {
  d3.select("#bars")
      .selectAll("rect")
      .data([])
      .exit()
      .remove();
  let list = document.getElementById('dataset');
  barChart.updateBarChart(list[list.selectedIndex].value);
}
