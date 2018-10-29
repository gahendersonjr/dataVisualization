
class ElectoralVoteChart {
  /**
   * Constructor for the ElectoralVoteChart
   *
   * @param shiftChart an instance of the ShiftChart class
   */
  constructor (shiftChart){
    this.shiftChart = shiftChart;

    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
    let divelectoralVotes = d3.select("#electoral-vote").classed("content", true);

    //Gets access to the div element created for this chart from HTML
    this.svgBounds = divelectoralVotes.node().getBoundingClientRect();
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = 150;

    //creates svg element within the div
    this.svg = divelectoralVotes.append("svg")
      .attr("width",this.svgWidth)
      .attr("height",this.svgHeight)
    ;
  };


  /**
   * Creates the stacked bar chart, text content and tool tips for electoral vote chart
   *
   * @param electionResult election data for the year selected
   * @param colorScale global quantile scale based on the winning margin between republicans and democrats
   */

  update (electionResult, colorScale){
    let a = this.svg.selectAll("*").remove();

    let dem_ev = electionResult[0].D_EV_Total;
    let rep_ev = electionResult[0].R_EV_Total;
    let ind_ev = electionResult[0].I_EV_Total;
    if(ind_ev==""){
      ind_ev=0;
    }
    let total_ev = parseFloat(ind_ev) + parseFloat(dem_ev) + parseFloat(rep_ev);

    let rep = [];
    let dem = [];
    let independent = [];
    let all = [];

    for(let state in electionResult){
      if(electionResult[state].State_Winner == "D"){
        dem.push(electionResult[state]);
      }
      if(electionResult[state].State_Winner == "R"){
        rep.push(electionResult[state]);
      }
      if(electionResult[state].State_Winner == "I"){
        independent.push(electionResult[state]);
      }
    }

    let barScale = d3.scaleLinear()
      .domain([0,538])
      .range([0, this.svgWidth]);

    function compare(a,b) {
      if (parseFloat(a.RD_Difference) < parseFloat(b.RD_Difference)){ return -1; }
      if (parseFloat(a.RD_Difference) > parseFloat(b.RD_Difference)){ return 1; }
      return 0;
    }

    all = dem.concat(rep);
    all.sort(compare);
    all = independent.concat(all);

    let xCounter = 0;

    this.svg.selectAll("rect")
    .data(all)
    .enter()
    .append("rect")
    .attr("height", 30)
    .attr("width", d => barScale(d.Total_EV))
    .attr("x", function(d){
      let x = xCounter;
      xCounter += barScale(d.Total_EV);
      return x;
    })
    .attr("y", "60")
    .attr("fill", function(d){
      if(d.State_Winner=="I"){ return "#45AD6A"; }
      return colorScale(d.RD_Difference)
    })
    .attr("id", d => d.State)
    .classed("electoralVotes", true);

    if(ind_ev>0){
      this.svg.append("text")
      .text(ind_ev)
      .attr("x", 0)
      .attr("y", 50)
      .classed("independent", true)
      .classed("electoralVoteText", true);
    }

    this.svg.append("text")
      .text(dem_ev)
      .attr("x", barScale(ind_ev))
      .attr("y", 50)
      .classed("democrat", true)
      .classed("electoralVoteText", true);

    this.svg.append("text")
      .text(rep_ev)
      .attr("x", barScale(total_ev))
      .attr("y", 50)
      .classed("republican", true)
      .classed("electoralVoteText", true);

    this.svg.append("line")
      .attr("x1", barScale(total_ev/2))
      .attr("y1", 50)
      .attr("x2", barScale(total_ev/2))
      .attr("y2", 100)
      .attr("stroke", "black");

    this.svg.append("text")
      .text("Elecotral Vote (" + Math.ceil(total_ev/2 + 1) + " needed to win)")
      .attr("x", barScale(total_ev/2))
      .attr("y", 45)
      .classed("electoralVotesNote", true);

    function brushed() {
    console.log(d3.selectAll(d3.event.selection));
  }

    let brush = d3.brushX().extent([[0,60],[this.svgWidth,90]]).on("end", brushed);
    //
    this.svg.append("g").attr("class", "brush").call(brush);
    //******* TODO: PART V *******
    //Implement brush on the bar chart created above.
    //Implement a call back method to handle the brush end event.
    //Call the update method of shiftChart and pass the data corresponding to brush selection.
    //HINT: Use the .brush class to style the brush.

  };


}
