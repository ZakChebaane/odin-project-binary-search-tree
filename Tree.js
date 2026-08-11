import {Node} from "./Node.js";

export class Tree {
    constructor(passedArr) {
        this.root = this.buildTree(passedArr);
        console.log(this.root);
    }
    buildTree(arr) {
        // sort the arr and remove duplicates
        arr.sort((a, b) => { return a - b });
        let currNum = 0;
        arr = arr.filter((element) => {
            if(element > currNum) {
                currNum = element;
                return element;
            }
        });
        // recursion start
        if (arr.length <= 2) {
            // Base Case
            if (arr.length === 1) {
                return arr[0];
            } else if (arr.length === 2) {
                console.log("haven't done this bit yet :(");
                return undefined;
            }
        } else if (arr.length > 2) {
            const middle = (arr.length - 1) / 2;
            const rootValue = arr[middle];
            const leftNodes = this.buildTree(arr.slice(0, middle));
            const rightNodes = this.buildTree(arr.slice(middle + 1));
            const node = new Node();
            node.storedData = rootValue;
            node.leftChild = leftNodes;
            node.rightChild = rightNodes;
            return node;
        }
    }
}