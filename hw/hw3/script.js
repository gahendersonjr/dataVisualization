/**
 * Makes the first bar chart appear as a staircase.
 *
 * Note: use only the DOM API, not D3!
 */
function staircase() {
  let bars = document.getElementById("chart1").getElementsByTagName("rect");
  let height = 10;
  for(let i=0; i<bars.length; i++){
    console.log(bars[i]);
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


  // ****** TODO: PART III (you will also edit in PART V) ******

  // TODO: Select and update the 'a' bar chart bars

  // TODO: Select and update the 'b' bar chart bars

  // TODO: Select and update the 'a' line chart path using this line generator

  let aLineGenerator = d3.line()
    .x((d, i) => iScale(i))
    .y((d) => aScale(d.a));

  // TODO: Select and update the 'b' line chart path (create your own generator)

  // TODO: Select and update the 'a' area chart path using this area generator
  let aAreaGenerator = d3.area()
    .x((d, i) => iScale(i))
    .y0(0)
    .y1(d => aScale(d.a));

  // TODO: Select and update the 'b' area chart path (create your own generator)

  // TODO: Select and update the scatterplot points

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
