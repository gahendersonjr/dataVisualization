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
			this.deepestLevel = 0;
			this.assignLevel(this.nodesList[0], 0);
			this.positionMap = new Map();
			this.assignPosition(this.nodesList[0], 0);

			for(var i in this.nodesList){
				console.log(this.nodesList[i]);
			}
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

    }

}
