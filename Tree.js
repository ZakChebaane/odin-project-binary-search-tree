import {Node} from "./Node.js";

export class Tree {
    constructor(passedArr) {
        this.root = this.buildTree(passedArr);
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
                const node = new Node();
                node.storedData = arr[0];
                return node;
            } else if (arr.length === 2) {
                const node = new Node();
                const childNode = new Node();
                childNode.storedData = arr[1];
                node.storedData = arr[0];
                node.rightChild = childNode;
                return node;
            }
        } else if (arr.length > 2) {
            const middle = Math.floor((arr.length - 1) / 2);
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
    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.storedData}`);
        this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}