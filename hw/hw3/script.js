/**
 * Makes the first bar chart appear as a staircase.
 *
 * Note: use only the DOM API, not D3!
 */
function staircase() {
  let bars = document.getElementById("barChart1").getElementsByTagName("rect");
  let height = 10;
  for(let i=0; i<bars.length; i++){
    bars[i].setAttribute("height", height);
    height+=15;
  }
}

/**
 * Render the visualizations
 * @param error
 * @param data
 */
function update(data) {
  // Set up the scales
  let aScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.a)])
    .range([0, 150]);
  let bScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.b)])
    .range([0, 150]);
  let iScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, 110]);

  let barChart1 = d3.select("#barChart1")
    .selectAll("rect")
    .data(data);

  barChart1.enter()
    .append("rect")
    .style("opacity", "0")
    .merge(barChart1)
    .on("mouseover", function(){
      d3.select(this).attr("fill", "lightblue")
    })
    .on("mouseout", function(){
      d3.select(this).attr("fill", "steelblue")
    })
    .attr("x", function(d,i){
      return (i+1)*10;
    })
    .attr("y", "0")
    .transition()
    .duration(1000)
    .attr("height", d => aScale(d.a))
    .attr("width", "10")
    .style("opacity", "1");

  barChart1.exit()
    .transition()
    .duration(1000)
    .style("opacity", "0")
    .attr("height", "0")
    .remove();

  let barChart2 = d3.select("#barChart2")
    .selectAll("rect")
    .data(data);

  barChart2.enter()
    .append("rect")
    .style("opacity", "0")
    .merge(barChart2)
    .on("mouseover", function(){
      d3.select(this).attr("fill", "lightblue")
    })
    .on("mouseout", function(){
      d3.select(this).attr("fill", "steelblue")
    })
    .attr("x", function(d,i){
      return (i+1)*10;
    })
    .attr("y", "0")
    .transition()
    .duration(1000)
    .attr("height", d => bScale(d.b))
    .attr("width", "10")
    .style("opacity", "1");

  barChart2.exit()
    .transition()
    .duration(1000)
    .style("opacity", "0")
    .attr("height", "0")
    .remove();

  let aLineGenerator = d3.line()
    .x((d, i) => iScale(i))
    .y((d) => aScale(d.a));

  let aLine = aLineGenerator(data);

  d3.select("#line1")
    .transition()
    .duration(1000)
    .attr("d", aLine);

  let bLineGenerator = d3.line()
    .x((d, i) => iScale(i))
    .y((d) => bScale(d.b));

  let bLine = bLineGenerator(data);

  d3.select("#line2")
    .transition()
    .duration(1000)
    .attr("d", bLine);

  let aAreaGenerator = d3.area()
    .x((d, i) => iScale(i))
    .y0(0)
    .y1(d => aScale(d.a));

  let aArea = aAreaGenerator(data);

  d3.select("#area1")
    .transition()
    .duration(1000)
    .attr("d", aArea);

  let bAreaGenerator = d3.area()
    .x((d, i) => iScale(i))
    .y0(0)
    .y1(d => bScale(d.b));

  let bArea = bAreaGenerator(data);

  d3.select("#area2")
    .transition()
    .duration(1000)
    .attr("d", bArea);

  let scatter = d3.select("#scatter")
    .selectAll("circle")
    .data(data);

  scatter.enter()
    .append("circle")
    .style("opacity", "0")
    .attr("cx", d => aScale(d.a))
    .attr("cy", d => aScale(d.b))
    .attr("r", "5")
    .merge(scatter)
    .on("click", d => console.log(`(${d.a}, ${d.b})`))
    .transition()
    .duration(1000)
    .style("opacity", "1")
    .attr("cx", d => aScale(d.a))
    .attr("cy", d => aScale(d.b))
    .attr("r", "5");

  scatter.exit()
    .transition()
    .duration(1000)
    .style("opacity", "0")
    .remove();
}

/**
 * Load the file indicated by the select menu
 */
function changeData() {
  let dataFile = document.getElementById('dataset').value;
  console.log(dataFile);
  if (document.getElementById('random').checked) {
    randomSubset();
  }
  else {
    let filename = './data/' + dataFile + '.csv';
    dataset = d3.csv(filename, function(d) {
      // Convert each data item to a number.
      return { a:+d.a, b:+d.b };
    })
    // After reading the entire dataset, call update().
      .then(update);
  }
}

/**
 *   Load the file indicated by the select menu, and then slice out a random chunk before passing the data to update()
 */
function randomSubset() {
  console.log("rando");
  let dataFile = document.getElementById('dataset').value;
  if (document.getElementById('random').checked) {
    let filename = './data/' + dataFile + '.csv';
    dataset = d3.csv(filename, function(d) {
      // Convert each data item to a number.
      return { a:+d.a, b:+d.b };
    })
    .then(function(data) {
      let subset = [];
      for (let d of data) {
        if (Math.random() > 0.5) {
          subset.push(d);
        }
      }
      update(subset);
    });
  }
  else {
    changeData();
  }
}
