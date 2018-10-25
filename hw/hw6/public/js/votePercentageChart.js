/** Class implementing the votePercentageChart. */
class VotePercentageChart {

  /**
   * Initializes the svg elements required for this chart;
   */
  constructor(tooltip){
    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
    let divvotesPercentage = d3.select("#votes-percentage").classed("content", true);

    //fetch the svg bounds
    this.svgBounds = divvotesPercentage.node().getBoundingClientRect();
    this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = 200;

    //add the svg to the div
    this.svg = divvotesPercentage.append("svg")
      .attr("width",this.svgWidth)
      .attr("height",this.svgHeight)

  }

  /**
   * Creates the stacked bar chart, text content and tool tips for Vote Percentage chart
   *
   * @param electionResult election data for the year selected
   */
  update (electionResult){
    //TODO: BAR NOT SHOWING UP IN ALL CASES, NOT WORKING
    console.log(electionResult);
    let dem_percent = electionResult[0].D_PopularPercentage;
    let rep_percent = electionResult[0].R_PopularPercentage;
    let ind_percent = electionResult[0].I_PopularPercentage;

    let dem_percent_clean = electionResult[0].D_PopularPercentage.replace("%", "");
    let rep_percent_clean = electionResult[0].R_PopularPercentage.replace("%", "");
    let ind_percent_clean = electionResult[0].I_PopularPercentage.replace("%", "");

    let dem_candidate = electionResult[0].D_Nominee_prop;
    let rep_candidate = electionResult[0].R_Nominee_prop;
    let ind_candidate = electionResult[0].I_Nominee_prop;

    let barScale = d3.scaleLinear()
      .domain([0,100])
      .range([0, this.svgWidth]);

    let xCounter = 0;

    this.svg.append("rect")
      .attr("height", 30)
      .attr("width", d => barScale(ind_percent_clean))
      .attr("x", function(d){
        let x = xCounter;
        xCounter += barScale(ind_percent_clean);
        return x;
      })
      .attr("y", "60")
      .classed("independent", true)
      .classed("votesPercentage", true);

    this.svg.append("rect")
      .attr("height", 30)
      .attr("width", d => barScale(dem_percent_clean))
      .attr("x", function(d){
        let x = xCounter;
        xCounter += barScale(dem_percent_clean);
        return x;
      })
      .attr("y", "60")
      .classed("democrat", true)
      .classed("votesPercentage", true);

    this.svg.append("rect")
      .attr("height", 30)
      .attr("width", d => barScale(rep_percent_clean))
      .attr("x", xCounter)
      .attr("y", "60")
      .classed("republican", true)
      .classed("votesPercentage", true);

    this.svg.append("text")
      .text(ind_percent)
      .attr("x", 0)
      .attr("y", 50)
      .classed("independent", true)
      .classed("electoralVoteText", true);

    this.svg.append("text")
      .text(ind_candidate)
      .attr("x", 0)
      .attr("y", 20)
      .classed("independent", true)
      .classed("electoralVoteText", true);

    this.svg.append("text")
      .text(dem_percent)
      .attr("x", barScale(ind_percent_clean))
      .attr("y", 50)
      .classed("democrat", true)
      .classed("electoralVoteText", true);

    this.svg.append("text")
      .text(dem_candidate)
      .attr("x", barScale(ind_percent_clean))
      .attr("y", 20)
      .classed("democrat", true)
      .classed("electoralVoteText", true);

    this.svg.append("text")
      .text(rep_percent)
      .attr("x", barScale(100))
      .attr("y", 50)
      .classed("republican", true)
      .classed("electoralVoteText", true);

    this.svg.append("line")
      .attr("x1", barScale(50))
      .attr("y1", 50)
      .attr("x2", barScale(50))
      .attr("y2", 100)
      .attr("stroke", "black");

    this.svg.append("text")
      .text("Popular Vote (50%)")
      .attr("x", barScale(50))
      .attr("y", 45)
      .classed("electoralVotesNote", true);
    //HINT: Use .votesPercentage class to style your bars.

    //Display the total percentage of votes won by each party
    //on top of the corresponding groups of bars.
    //HINT: Use the .votesPercentageText class to style your text elements;  Use this in combination with
    // chooseClass to get a color based on the party wherever necessary

    //Display a bar with minimal width in the center of the bar chart to indicate the 50% mark
    //HINT: Use .middlePoint class to style this bar.

    //Just above this, display the text mentioning details about this mark on top of this bar
    //HINT: Use .votesPercentageNote class to style this text element
  };


}
