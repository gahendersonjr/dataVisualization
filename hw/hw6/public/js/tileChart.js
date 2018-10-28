
/** Class implementing the tileChart. */
class TileChart {

  /**
   * Initializes the svg elements required to lay the tiles
   * and to populate the legend.
   */
  constructor(tooltip){

    let divTiles = d3.select("#tiles").classed("content", true);
    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
    //Gets access to the div element created for this chart and legend element from HTML
    let svgBounds = divTiles.node().getBoundingClientRect();
    this.svgWidth = svgBounds.width - this.margin.left - this.margin.right;
    this.svgHeight = this.svgWidth/2;
    let legendHeight = 150;
    //add the svg to the div
    let legend = d3.select("#legend").classed("content",true);

    //creates svg elements within the div
    this.legendSvg = legend.append("svg")
      .attr("width",this.svgWidth)
      .attr("height",legendHeight)
      .attr("transform", "translate(" + this.margin.left + ",0)")
    this.svg = divTiles.append("svg")
      .attr("width",this.svgWidth)
      .attr("height",this.svgHeight)
      .attr("transform", "translate(" + this.margin.left + ",0)")

    this.tooltip = tooltip;
  };

  /**
   * Returns the class that needs to be assigned to an element.
   *
   * @param party an ID for the party that is being referred to.
   */
  chooseClass (party) {
    if (party == "R"){
      return "republican";
    }
    else if (party== "D"){
      return "democrat";
    }
    else if (party == "I"){
      return "independent";
    }
  }

  /**
   * Creates tiles and tool tip for each state, legend for encoding the
   * color scale information.
   *
   * @param electionResult election data for the year selected
   * @param colorScale global quantile scale based on the winning
   * margin between republicans and democrats
   */
  update (electionResult, colorScale){
    this.svg.selectAll("*").remove();

    //Calculates the maximum number of rows and columns
    let maxColumns = d3.max(electionResult, d => +d.Space) + 1;
    let maxRows = d3.max(electionResult, d => +d.Row) + 1;

    let squareHeight = this.svgHeight / maxRows;
    let squareWidth = this.svgWidth / maxColumns;
    console.log(squareHeight);
    console.log(squareWidth);
    // this.svg.selectAll("text")
    //   .data(electionResult)
    //   .enter().
    //   append("text").
    //   text(d => d.State).
    //   attr("y", d=>d.Row*20+20).
    //   attr("x", d=>d.Space*60);
    this.svg.selectAll("rect")
      .data(electionResult)
      .enter()
      .append("rect")
      .attr("id", d => d.State)
      .attr("y", d=>d.Row*squareHeight)
      .attr("x", d=>d.Space*squareWidth)
      .attr("height", squareHeight)
      .attr("width", squareWidth)
      .classed("tile", true)
      .attr("fill", function(d){
        if(d.State_Winner=="I"){ return "#45AD6A"; }
        return colorScale(d.RD_Difference)
      });

    let enter = this.svg.selectAll("text")
      .data(electionResult)
      .enter();

    enter
      .append("text")
      .text(d=> d.Abbreviation)
      .attr("y", d=>d.Row*squareHeight+squareHeight/2)
      .attr("x", d=>d.Space*squareWidth+squareHeight/2)
      .classed("tilestext", true);

    enter
      .append("text")
      .text(d=> d.Total_EV)
      .attr("y", d=>d.Row*squareHeight+squareHeight/2+24)
      .attr("x", d=>d.Space*squareWidth+squareHeight/2)
      .classed("tilestext", true);


    // ******* TODO: PART IV *******
    //Tansform the legend element to appear in the center and make a call to this element for it to display.

    //Lay rectangles corresponding to each state according to the 'row' and 'column' information in the data.

    //Display the state abbreviation and number of electoral votes on each of these rectangles

    //Use global color scale to color code the tiles.

    //HINT: Use .tile class to style your tiles;
    // .tilestext to style the text corresponding to tiles

    //Call the tool tip on hover over the tiles to display stateName, count of electoral votes
    //then, vote percentage and number of votes won by each party.
    //HINT: Use the .republican, .democrat and .independent classes to style your elements.

  };


}
