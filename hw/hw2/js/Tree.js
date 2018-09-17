/** Class representing a Tree. */
class Tree {
	/**
	 * Creates a Tree Object
	 * parentNode, children, parentName,level,position
	 * @param {json[]} json - array of json object with name and parent fields
	 */

  constructor(json) {
		this.nodesList = [];
		this.nodeMap = new Map();

		for(var i in json){
			var node = new Node(json[i].name, json[i].parent)
			this.nodesList.push(node);
			this.nodeMap.set(node.name, node);
		}

		for(var i in this.nodesList){
			var node = this.nodesList[i];
			node.parentNode = this.nodeMap.get(node.parentName);
			if(node.parentNode){
				node.parentNode.addChild(node);
			}
		}
	}

	/**
	 * Function that builds a tree from a list of nodes with parent refs
	 */
	buildTree() {
		this.assignLevel(this.nodesList[0], 0);
		this.positionMap = new Map();
		this.assignPosition(this.nodesList[0], 0);
	}

	/**
	 * Recursive function that assign positions to each node
	 */
	assignPosition(node, position) {
		if(node.parentNode && position<node.parentNode.position){
			position = node.parentNode.position;
		}
		while(this.positionMap.get(`${node.level},${position}`)){
			position++;
		}
		node.position = position;
		this.positionMap.set(`${node.level},${position}`, true);
		for(var i in node.children){
			this.assignPosition(node.children[i], position+Number(i));
		}
	}

	/**
	 * Recursive function that assign levels to each node
	 */
	assignLevel(node, level) {
		node.level = level;
		for(var i in node.children){
			this.assignLevel(node.children[i], level+1);
		}
	}

	/**
	 * Function that renders the tree
	 */
	renderTree() {
		let svg = d3.select("body")
			.append("svg")
			.attr("width", 1200)
			.attr("height", 1200);

		svg.selectAll("line")
			.data(this.nodesList.slice(1, this.nodesList.length))
			.enter()
			.append("line")
			.attr("x1", d => d.parentNode.level*220+50)
			.attr("y1", d => d.parentNode.position*100+55)
			.attr("x2", d => d.level*220+50)
			.attr("y2", d => d.position*100+55);

		svg.selectAll("circle")
		  .data(this.nodesList)
		  .enter()
		  .append("circle")
		  .attr("cx", d => d.level*220+50)
		  .attr("cy", d => d.position*100+50)
		  .attr("r", 45);


		svg.selectAll("text")
			.data(this.nodesList)
			.enter()
			.append("text")
			.attr("x", d => d.level*220+50)
			.attr("y", d => d.position*100+55)
			.attr("text-anchor", "middle")
			.html(d => d.name);
		}
}
