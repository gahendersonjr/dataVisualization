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

  d3.select("body")
    .selectAll("#barChart1 > rect")
    .data(data)
    .attr("height", d => aScale(d.a))
    .on("mouseover", function(){
      d3.select(this).attr("fill", "lightblue")
    })
    .on("mouseout", function(){
      d3.select(this).attr("fill", "steelblue")
    });

  d3.select("body")
    .selectAll("#barChart2 > rect")
    .data(data)
    .attr("height", d => bScale(d.b))
    .on("mouseover", function(){
      d3.select(this).attr("fill", "lightblue")
    })
    .on("mouseout", function(){
      d3.select(this).attr("fill", "steelblue")
    });

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

  d3.select("body")
    .selectAll("#scatter > circle")
    .data(data)
    .attr("cx", d => aScale(d.a))
    .attr("cy", d => aScale(d.b))
    .on("click", d => console.log(`(${d.a}, ${d.b})`));

  // ****** TODO: PART IV ******

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
