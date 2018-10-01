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
    this.previous;
    for(let i in this.allData){
      if(this.allData[i].year){
        this.years.push(this.allData[i].year);
        this.attendance.push(this.allData[i].attendance);
        this.matches.push(this.allData[i].matches);
        this.teams.push(this.allData[i].teams);
        this.goals.push(this.allData[i].goals);
      }
    }
    this.currentSelected = [];
  }

  updateBarChart(selectedDimension) {
    let data = [];
    if(selectedDimension=="attendance"){ data = this.attendance; }
    if(selectedDimension=="matches"){ data = this.matches; }
    if(selectedDimension=="teams"){ data = this.teams; }
    if(selectedDimension=="goals"){ data = this.goals; }

    let xScale = d3.scaleBand()
      .domain(this.years)
      .range([45, 480]);

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d)])
      .range([350,0]);

    let colorScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d)])
      .range(["white", "blue"]);

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

    let map = this.worldMap;
    let info = this.infoPanel;
    let all = this.allData;
    d3.select("#bars")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("height", d => 350-yScale(d))
        .attr("fill", d => colorScale(d))
        .attr("width", "15")
        .attr("x", (d,i) => (i+1)*21.75 )
        .attr("y", "0")
        .on("click", function(d, i){
          var selected = document.getElementsByClassName("selected");
          if(selected[0]){
            selected[0].classList.remove("selected");
          }
          d3.select(this).attr("class", "selected");
          map.updateMap(all[i]);
          info.updateInfo(all[i]);
        })
        .attr("class", function(d,i){
          if(document.getElementById("edition").innerText.includes(all[i].year)){
            console.log("hello");
            return "selected";
          }
        });
  }

}
