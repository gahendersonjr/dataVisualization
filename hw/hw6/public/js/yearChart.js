
class YearChart {

  /**
   * Constructor for the Year Chart
   *
   * @param electoralVoteChart instance of ElectoralVoteChart
   * @param tileChart instance of TileChart
   * @param votePercentageChart instance of Vote Percentage Chart
   * @param electionInfo instance of ElectionInfo
   * @param electionWinners data corresponding to the winning parties over mutiple election years
   */
  constructor (electionWinners) {
    // the data
    this.electionWinners = electionWinners;

    // Initializes the svg elements required for this chart
    this.margin = {top: 10, right: 20, bottom: 30, left: 50};
    let divyearChart = d3.select("#year-chart").classed("fullView", true);

    //fetch the svg bounds
    this.svgBounds = divyearChart.node().getBoundingClientRect();
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = 100;

    //add the svg to the div
    this.svg = divyearChart.append("svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight);

    this.selected = null;

    //Domain definition for global color scale
    let domain = [-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60];

    //Color range for global color scale
    let range = ["#063e78", "#08519c", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#fcbba1", "#fc9272", "#fb6a4a", "#de2d26", "#a50f15", "#860308"];

    this.colorScale = d3.scaleQuantile()
      .domain(domain)
      .range(range);
  }

  /**
   * Returns the class that needs to be assigned to an element.
   *
   * @param party an ID for the party that is being referred to.
   */
  chooseClass (data) {
    if (data == "R") {
      return "yearChart republican";
    }
    else if (data == "D") {
      return "yearChart democrat";
    }
    else if (data == "I") {
      return "yearChart independent";
    }
  }

  /**
   * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
   */
  update () {
    let num_elements = this.electionWinners.length;

    this.svg.append("line")
      .attr("x1", this.svgWidth)
      .attr("y1", 40)
      .attr("x2", 0)
      .attr("y2", 40)
      .classed("lineChart", true);

    this.svg.selectAll("circle")
      .data(this.electionWinners)
      .enter()
      .append("circle")
      .attr("r", "20")
      .attr("cx", (d,i)=>i*(this.svgWidth/num_elements)+35)
      .attr("cy", 40)
      .attr("class", d=>this.chooseClass(d.PARTY))
      .on("mouseover", function(d){
        d3.select(this).classed("highlighted", true)
      })
      .on("mouseout", function(d){
        d3.select(this).classed("highlighted", false)
      })
      .on("click", function(d){
        d3.selectAll(".selected").classed("selected", false);
        d3.select(d3.event.target).classed("selected", true);
        d3.csv("data/Year_Timeline_" + d.YEAR + ".csv").then(electionResults => {
          electoralVoteChart.update(electionResults, this.colorScale);
          tileChart.update(electionResults, this.colorScale);
          votePercentageChart.update(electionResults);
        });
      }.bind(this));
    //Append text information of each year right below the corresponding circle
    //HINT: Use .yeartext class to style your text elements
    this.svg.selectAll("text")
      .data(this.electionWinners)
      .enter()
      .append("text")
      .text(d=> d.YEAR)
      .attr("x", (d,i)=>i*(this.svgWidth/num_elements)+35)
      .attr("y", 90)
      .classed("yeartext", true);


    //Style the chart by adding a dashed line that connects all these years.
    //HINT: Use .lineChart to style this dashed line

    //Clicking on any specific year should highlight that circle and  update the rest of the visualizations
    //HINT: You can get the d3 selection that was clicked on using
    //   d3.select(d3.event.target)
    //HINT: Use .highlighted class to style the highlighted circle

    //Election information corresponding to that year should be loaded and passed to
    // the update methods of other visualizations


    //******* TODO: EXTRA CREDIT *******

    //Implement brush on the year chart created above.
    //Implement a call back method to handle the brush end event.
    //Call the update method of shiftChart and pass the data corresponding to brush selection.
    //HINT: Use the .brush class to style the brush.

  }

}
