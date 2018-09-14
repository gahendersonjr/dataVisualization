/** Class representing a Tree. */
class Tree {
	/**
	 * Creates a Tree Object
	 * parentNode, children, parentName,level,position
	 * @param {json[]} json - array of json object with name and parent fields
	 */

	constructor(json) {
		this.nodes = [];
		var nodeMap = new Map();

		for(var i in json){
			var node = new Node(json[i].name, json[i].parent)
			this.nodes.push(node);
			nodeMap.set(node.name, node);
		}

		for(var i in this.nodes){
			var node = this.nodes[i];
			node.parentNode = nodeMap.get(node.parentName);
			if(node.parentNode){
				node.parentNode.addChild(node);
			}
		}

		// for(i in this.nodes){
		// 	console.log(this.nodes[i]);
		// }
	}

	/**
	 * Function that builds a tree from a list of nodes with parent refs
	 */
	buildTree() {

        //Assign Positions and Levels by making calls to assignPosition() and assignLevel()
    }

	/**
	 * Recursive function that assign positions to each node
	 */
	assignPosition(node, position) {

	}

	/**
	 * Recursive function that assign levels to each node
	 */
	assignLevel(node, level) {

	}

	/**
	 * Function that renders the tree
	 */
	renderTree() {

    }

}
