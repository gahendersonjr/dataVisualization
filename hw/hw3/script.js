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
    .merge(barChart1)
    .attr("height", d => aScale(d.a))
    .attr("width", "10")
    .attr("x", function(d,i){
      return (i+1)*10;
    })
    .attr("y", "0")
    .on("mouseover", function(){
      d3.select(this).attr("fill", "lightblue")
    })
    .on("mouseout", function(){
      d3.select(this).attr("fill", "steelblue")
    });

  barChart1.exit()
    .remove();

  let barChart2 = d3.select("#barChart2")
    .selectAll("rect")
    .data(data);

  barChart2.enter()
    .append("rect")
    .merge(barChart2)
    .attr("height", d => bScale(d.b))
    .attr("width", "10")
    .attr("x", function(d,i){
      return (i+1)*10;
    })
    .attr("y", "0")
    .on("mouseover", function(){
      d3.select(this).attr("fill", "lightblue")
    })
    .on("mouseout", function(){
      d3.select(this).attr("fill", "steelblue")
    });

  barChart2.exit()
    .remove();

  let aLineGenerator = d3.line()
    .x((d, i) => iScale(i))
    .y((d) => aScale(d.a));

  let aLine = aLineGenerator(data);

  d3.select("#line1")
    .attr("d", aLine);

  let bLineGenerator = d3.line()
    .x((d, i) => iScale(i))
    .y((d) => bScale(d.b));

  let bLine = bLineGenerator(data);

  d3.select("#line2")
    .attr("d", bLine);

  let aAreaGenerator = d3.area()
    .x((d, i) => iScale(i))
    .y0(0)
    .y1(d => aScale(d.a));

  let aArea = aAreaGenerator(data);

  d3.select("#area1")
    .attr("d", aArea);

  let bAreaGenerator = d3.area()
    .x((d, i) => iScale(i))
    .y0(0)
    .y1(d => bScale(d.b));

  let bArea = bAreaGenerator(data);

  d3.select("#area2")
    .attr("d", bArea);

  let scatter = d3.select("#scatter")
    .selectAll("circle")
    .data(data);

  scatter.enter()
    .append("circle")
    .merge(scatter)
    .attr("cx", d => aScale(d.a))
    .attr("cy", d => aScale(d.b))
    .attr("r", "5")
    .on("click", d => console.log(`(${d.a}, ${d.b})`));

  scatter.exit()
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
