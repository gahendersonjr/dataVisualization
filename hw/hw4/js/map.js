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
    d3.select("#map")
      .selectAll("path")
      .classed("team", false)
      .classed("host", false)
      .classed("gold", false);
    d3.select(".gold").remove();
    d3.select(".silver").remove();
  }

  /**
   * Update Map with info for a specific FIFA World Cup
   * @param wordcupData the data for one specific world cup
   */
  updateMap(worldcupData) {
    console.log(worldcupData.teams_iso);
    this.clearMap();
    for(let i in worldcupData.teams_iso){
      document.getElementById(worldcupData.teams_iso[i]).classList.add("team");
    }
    document.getElementById(worldcupData.host_country_code).classList.add("host");

    d3.select("#points")
      .append("circle")
      .attr("cy", this.projection([worldcupData.WIN_LON, worldcupData.WIN_LAT])[1])
      .attr("cx", this.projection([worldcupData.WIN_LON, worldcupData.WIN_LAT])[0])
      .attr("r", "5")
      .attr("class", "gold");
    d3.select("#points")
        .append("circle")
        .attr("cy", this.projection([worldcupData.RUP_LON, worldcupData.RUP_LAT])[1])
        .attr("cx", this.projection([worldcupData.RUP_LON, worldcupData.RUP_LAT])[0])
        .attr("r", "5")
        .attr("class", "silver");
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
