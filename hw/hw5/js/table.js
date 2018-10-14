/** Class implementing the table. */
class Table {
  /**
   * Creates a Table Object
   */
  constructor(teamData, treeObject) {

    // Maintain reference to the tree Object;
    this.tree = treeObject;

    // Create list of all elements that will populate the table
    // Initially, the tableElements will be identical to the teamData
    this.tableElements = teamData.slice(0, teamData.size); //

    // Store all match data for the 2014 Fifa cup
    this.teamData = teamData;

    // Default values for the Table Headers
    this.tableHeaders = ["Delta Goals", "Result", "Wins", "Losses", "TotalGames"];

    // To be used when sizing the svgs in the table cells.
    this.cell = {
      "width": 70,
      "height": 20,
      "buffer": 15
    };

    this.bar = {
      "height": 20
    };

    // Set variables for commonly accessed data columns
    this.goalsMadeHeader = 'Goals Made';
    this.goalsConcededHeader = 'Goals Conceded';

    // // Setup the scales
    this.goalScale = d3.scaleLinear()
      .domain([0, d3.max([d3.max(this.teamData, d => d.value[this.goalsMadeHeader]), d3.max(this.teamData, d => d.value[this.goalsConcededHeader])])])
      .range([10,145]);



    // Used for games/wins/losses
    this.gameScale = d3.scaleLinear()
      .domain([0, d3.max(this.teamData, d => d.value.TotalGames)]);

    // Color scales
    // For aggregate columns  Use colors '#ece2f0', '#016450' for the range.
    this.aggregateColorScale = d3.scaleLinear()
      .domain([0, d3.max(this.teamData, d => d.value.TotalGames)])
      .range(['#ece2f0', '#016450']);

    // For goal Column. Use colors '#cb181d', '#034e7b'  for the range.
    this.goalColorScale = null;
  }


  /**
   * Creates a table skeleton including headers that when clicked allow
   * you to sort the table by the chosen attribute.
   * Also calculates aggregate values of goals, wins, losses and total
   * games as a function of country.
   */
  createTable() {
    // ******* TODO: PART II *******
    // Update Scale Domains
    // Create the x axes for the goalScale.
    // console.log(this.teamData[0].value["Goals Made"]);
    let goalAxis = d3.axisTop()
      .scale(this.goalScale);

    d3.select("#goalHeader")
      .append("svg")
      .attr("height", 25)
      .attr("width", 160)
      .append("g")
      .attr("transform", "translate(0,20) scale(1, 1)")
      .call(goalAxis);

    // Add GoalAxis to header of col 1.

    // ******* TODO: PART V *******

    // Set sorting callback for clicking on headers


    // Clicking on headers should also trigger collapseList() and
    // updateTable().

  }


  /**
   * Updates the table contents with a row for each element in the global
   * variable tableElements.
   */
  updateTable() {
    console.log(this.cell.height);
    // ******* TODO: PART III *******
    // Create table rows
    let table = d3.select("#matchTable").select("tBody");

    table.selectAll("tr").
      data(this.tableElements).
      enter().
      append("tr");

    let td = table.selectAll("tr").selectAll("td").data(function(d){
      let data = [];
      let team = [['type', 'aggregate'],['vis', 'header'],['value', d.key]];
      data.push(new Map(team));
      let goals = [['type', 'aggregate'],['vis', 'goals'],['value', [d.value["Goals Made"],d.value["Goals Conceded"]]]];
      data.push(new Map(goals));
      let result = [['type', 'aggregate'],['vis', 'text'],['value', d.value.Result.label]];
      data.push(new Map(result));
      let wins = [['type', 'aggregate'],['vis', 'bar'],['value', d.value.Wins]];
      data.push(new Map(wins));
      let losses = [['type', 'aggregate'],['vis', 'bar'],['value', d.value.Losses]];
      data.push(new Map(losses));
      let totalGames = [['type', 'aggregate'],['vis', 'bar'],['value', d.value.TotalGames]];
      data.push(new Map(totalGames));
      return data;
    })
    .enter();

    // Append th elements for the Team Names

    td.filter(function(d){
      return d.get('vis')=='header';
    })
    .append("th")
    .html(d => d.get('value'));

    //goals
    td.filter(function(d){
      return d.get('vis')=='goals';
    })
    .append("td")
    .html(d => "goals" + d.get('value'));

    //result
    td.filter(function(d){
      return d.get('vis')=='text';
    })
    .append("td")
    .html(d => d.get('value'));

    //bars
    let barSVG = td.filter(function(d){
      return d.get('vis')=='bar';
    })
    .append("td")
    .append("svg")
    .attr("height", this.cell.height)
    .attr("width", this.cell.width)
    .attr("transform", "translate(-5,0) scale(1, 1)");

    barSVG.append("rect")
    .attr("fill", d => this.aggregateColorScale(d.get('value')))
    .attr("height", this.cell.height)
    .attr("width", d => this.gameScale(d.get('value'))*this.cell.width);

    barSVG.append("text")
    .attr("class", "label")
    .text(d => d.get('value'))
    .attr("x", d => this.gameScale(d.get('value'))*this.cell.width - 10)
    .attr("y", "15");

    // Append td elements for the remaining columns.
    // Data for each cell is of the type: {'type':<'game' or 'aggregate'>,
    // 'value':<[array of 1 or two elements]>}

    //Add scores as title property to appear on hover

    //Populate cells (do one type of cell at a time)

    //Create diagrams in the goals column

    //Set the color of all games that tied to light gray

  };

  /**
   * Updates the global tableElements variable, with a row for each row
   * to be rendered in the table.
   */
  updateList(i) {
    // ******* TODO: PART IV *******

    // Only update list for aggregate clicks, not game clicks
  }

  /**
   * Collapses all expanded countries, leaving only rows for aggregate
   * values per country.
   */
  collapseList() {

    // ******* TODO: PART IV *******

  }
}
