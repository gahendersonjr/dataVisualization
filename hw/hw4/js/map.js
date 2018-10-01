/** Class implementing the map view. */
class Map {
  /**
   * Creates a Map Object
   */
  constructor() {
    this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);

  }

  /**
   * Function that clears the map
   */
  clearMap() {
    // ******* TODO: PART V*******
    // Clear the map of any colors/markers; You can do this with inline styling or by
    // defining a class style in styles.css

    // Hint: If you followed our suggestion of using classes to style
    // the colors and markers for hosts/teams/winners, you can use
    // d3 selection and .classed to set these classes on and off here.
    d3.select("#map")
      .selectAll("path")
      .classed("team", false)
      .classed("host", false)
      .classed("gold", false);
  }

  /**
   * Update Map with info for a specific FIFA World Cup
   * @param wordcupData the data for one specific world cup
   */
  updateMap(worldcupData) {
    console.log(worldcupData.teams_iso);
    //Clear any previous selections;
    this.clearMap();
    for(let i in worldcupData.teams_iso){
      document.getElementById(worldcupData.teams_iso[i]).classList.add("team");
    }
    document.getElementById(worldcupData.host_country_code).classList.add("host");

    // ******* TODO: PART V *******

    // Add a marker for the winner and runner up to the map.
    // document.getElementByID("")
    // Hint: remember we have a conveniently labeled class called .winner
    // as well as a .silver. These have styling attributes for the two
    // markers.


    // Select the host country and change it's color accordingly.

    // Iterate through all participating teams and change their color as well.

    // We strongly suggest using CSS classes to style the selected countries.


    // Add a marker for gold/silver medalists
  }

  /**
   * Renders the actual map
   * @param the json data with the shape of all countries
   */
  drawMap(world) {
    world = topojson.feature(world,world.objects.countries);
    let path = d3.geoPath()
      .projection(this.projection);
    d3.select("#map").selectAll("path")
      .data(world.features)
      .enter()
      .append("path")
      .attr("class", "countries")
      .attr("id", d => d.id)
      .attr("d", path);
  }


}
