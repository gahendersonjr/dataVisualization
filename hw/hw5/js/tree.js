/** Class implementing the tree view. */
class Tree {
    /**
     * Creates a Tree Object
     */
    constructor() {
    }

    /**
     * Creates a node/edge structure and renders a tree layout based on
     * the input data
     *
     * @param treeData an array of objects that contain parent/child
     * information.
     */
  createTree(treeData) {


    let makeHierarchy = d3.stratify()
        .id(d => d.id)
        .parentId(d => d.ParentGame);

    let root = makeHierarchy(treeData);

    let mapFunction = d3.tree().size([800, 400]);
    let mapped = mapFunction(root);

    let nodes = mapped.descendants();
    let links = mapped.descendants().slice(1);

    let tree = d3.select("#tree");
    tree.selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return `M ${d.y},${d.x} C ` +
        `${(d.y+d.parent.y)/2},${d.x} ` +
        `${(d.y+d.parent.y)/2},${d.parent.x} ` +
        `${d.parent.y},${d.parent.x}`;
      });

    let nodeG = tree.selectAll('g')
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", function(d){
        let classes = "node"
        if(d.data.Wins>0){
          classes += " winner";
        }
        classes += " " + d.data.Team;
        return classes;
      })
      .attr("id", d => d.data.Team + d.data.Opponent);

    nodeG.append("circle")
      .attr("r", 5)
      .attr("cx", d =>d.y)
      .attr("cy", d =>d.x);
    nodeG.append("text")
      .text(d=> d.data.Team)
      .attr("x", d => d.y-30)
      .attr("y", d => d.x+20);
      ;

  };

  /**
   * Updates the highlighting in the tree based on the selected team.
   * Highlights the appropriate team nodes and labels.
   *
   * @param row a string specifying which team was selected in the table.
   */
  updateTree(row) {
    // ******* TODO: PART VII *******
    let elements = [];
    if(row.value.type=="aggregate"){
      elements = document.getElementsByClassName(row.key);
    } else if (row.value.type=="game"){
      console.log(row);
      elements.push(document.getElementById(row.key + row.value.Opponent));
      elements.push(document.getElementById(row.value.Opponent + row.key));
    }
    for(let i in elements){
      if(elements[i] && elements[i].classList){
        elements[i].classList.add("selectedLabel");
      }
    }
  }

  /**
   * Removes all highlighting from the tree.
   */
  clearTree() {
    // ******* TODO: PART VII *******
    let elements = document.getElementsByClassName("selectedLabel");
    for(let i = elements.length -1; i>=0; i--){
      if(elements[i].classList){
        elements[i].classList.remove("selectedLabel");
      }
    }
    // You only need two lines of code for this! No loops!
  }
}
