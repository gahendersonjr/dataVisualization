/** Class implementing the bar chart view. */
class BarChart {

  /**
   * Create a bar chart instance and pass the other views in.
   * @param worldMap
   * @param infoPanel
   * @param allData
   */
  constructor(worldMap, infoPanel, allData) {
    this.worldMap = worldMap;
    this.infoPanel = infoPanel;
    this.allData = allData.reverse();
    this.years = []
    this.attendance = [];
    this.matches = [];
    this.teams = [];
    this.goals = [];
    for(let i in this.allData){
      if(this.allData[i].year){
        this.years.push(this.allData[i].year);
        this.attendance.push(this.allData[i].attendance);
        this.matches.push(this.allData[i].matches);
        this.teams.push(this.allData[i].teams);
        this.goals.push(this.allData[i].goals);
      }
    }
  }

  /**
   * Render and update the bar chart based on the selection of the data type in the drop-down box
   */
  updateBarChart(selectedDimension) {
    // console.log(selectedDimension);
    console.log(selectedDimension);
    let data = [];
    if(selectedDimension=="attendance"){ data = this.attendance; }
    if(selectedDimension=="matches"){ data = this.matches; }
    if(selectedDimension=="teams"){ data = this.teams; }
    if(selectedDimension=="goals"){ data = this.goals; }
    console.log(data);
    // ****** TODO: PART I *******
    // Create the x and y scales; make
    // sure to leave room for the axes
    let xScale = d3.scaleBand()
      .domain(this.years)
      .range([45, 480]);

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d)])
      .range([350,0]);

    // Create colorScale
    let colorScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d)])
      .range(["white", "darkred"]);

    // Create the axes (hint: use #xAxis and #yAxis)
    let xAxis = d3.axisBottom()
      .scale(xScale)
      .tickValues(this.years);

    let yAxis = d3.axisLeft()
      .scale(yScale);

    d3.select("#xAxis")
      .call(xAxis)
      .selectAll("text")
        .attr("dx", "25")
        .attr("dy", "-5")
        .attr("transform", "rotate(90)" );

    d3.select("#yAxis")
      .call(yAxis);

    // Create the bars (hint: use #bars)
    d3.select("#bars")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("height", d => 350-yScale(d))
        .attr("fill", d => colorScale(d))
        .attr("width", "15")
        .attr("x", (d,i) => (i+1)*21.75 )
        .attr("y", "0");

    // ******* TODO: PART II *******

    // Implement how the bars respond to click events
    // Color the selected bar to indicate is has been selected.
    // Make sure only the selected bar has this new color.

    // Call the necessary update functions for when a user clicks on a bar.
    // Note: think about what you want to update when a different bar is selected.

  }

  /**
   *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
   *
   *  There are 4 attributes that can be selected:
   *  goals, matches, attendance and teams.
   */
  chooseData() {
    // ******* TODO: PART I *******
    //Changed the selected data when a user selects a different
    // menu item from the drop down.
  }
}
