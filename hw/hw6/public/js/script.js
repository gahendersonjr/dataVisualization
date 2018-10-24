//Domain definition for global color scale
let domain = [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60];

//Color range for global color scale
let range = ["#063e78", "#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15", "#860308"];

let colorScale = d3.scaleQuantile()
  .domain(domain)
  .range(range);

let tooltip = new Tooltip();

let votePercentageChart = new VotePercentageChart(tooltip);

let tileChart = new TileChart(tooltip, colorScale);

let shiftChart = new ShiftChart();

let electoralVoteChart = new ElectoralVoteChart(shiftChart, colorScale);


// Load the data corresponding to all the election years.
// Pass this data and instances of all the charts that update on year
// selection to yearChart's constructor.
d3.csv("data/yearwiseWinner.csv").then(electionWinners => {
  // console.log(electionWinners);
  let yearChart = new YearChart(electionWinners);
  yearChart.update();
});
