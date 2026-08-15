import {Node} from "./Node.js";
import {Queue} from "./Queue.js";

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
    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.storedData}`);
        this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
    includes(value, node = this.root) {
        if (!node.storedData) {
            return false;
        } else if (node.storedData && node.storedData === value) {
            return true;
        } else if (node.leftChild || node.rightChild) {
            if (node.leftChild) {
                let doesContain = this.includes(value, node.leftChild);
                if (doesContain) { return true }
            }
            if (node.rightChild) {
                let doesContain = this.includes(value, node.rightChild);
                if (doesContain) { return true }
            }
            return false;
        }
    }
    insert(value) {
        let node = this.root;
        let run = true;
        while(run) {
            // empty
            if (!node) {
                const newNode = new Node();
                newNode.storedData = value;
                this.root = newNode;
                run = false;
            }
            else if(value < node.storedData) {
                if(node.leftChild) {
                    node = node.leftChild;
                } else if (!node.leftChild) {
                    const newNode = new Node();
                    newNode.storedData = value;
                    node.leftChild = newNode;
                    run = false;
                }
            } else if (value > node.storedData) {
                if (node.rightChild) {
                    node = node.rightChild;
                } else if (!node.rightChild) {
                    const newNode = new Node();
                    newNode.storedData = value;
                    node.rightChild = newNode;
                    run = false;
                }
            } else if (value === node.storedData) {
                return;
            }
        }
    }
    deleteItem(value, node = this.root, firstNode = true) {
        if (node.storedData === value) {
            // Delete this node
            if (node.leftChild && node.rightChild) {
                // return 1;
                const currValue = node.storedData;
                const smallestValue = this.getSmallestValue(node.rightChild, node.storedData);
                node.storedData = smallestValue;
                this.deleteItem(currValue);
            } else if (node.leftChild && !node.rightChild) {
                if (firstNode) {
                    this.root = this.root.leftChild;
                } else { return 2 }
            } else if (!node.leftChild && node.rightChild) {
                if (firstNode) {
                    this.root = this.root.rightChild;
                } else { return 3 }
            } else if (!node.leftChild && !node.rightChild) {
                if (firstNode) {
                    this.root = null;
                } else { return 4 }
            }
        }
        if (node.leftChild) {
            const returnNum = this.deleteItem(value, node.leftChild, false);
            if (returnNum === 4) {
                node.leftChild = null;
                return;
            } else if (returnNum === 3) {
                // there is a right child
                node.leftChild = node.leftChild.rightChild;
                return;
            } else if (returnNum === 2) {
                // there is a left child
                node.leftChild = node.leftChild.leftChild;
            }
        }
        if (node.rightChild) {
            const returnNum = this.deleteItem(value, node.rightChild, false);
            if (returnNum === 4) {
                node.rightChild = null;
                return;
            } else if (returnNum === 3) {
                // there is a right child
                node.rightChild = node.rightChild.rightChild;
                return;
            } else if (returnNum === 2) {
                // there is a left child
                node.rightChild = node.rightChild.rightChild;
            }
        }
    }
    getSmallestValue (node, nodeValue) {
        let smallestValue = node.storedData;
        while (node.leftChild) {
            node = node.leftChild;
            smallestValue = node.storedData;
        }
        if (!node.leftChild) {
            node.storedData = nodeValue;
        }
        return smallestValue;
    }
    levelOrderForEach(callback) {
        if(!callback) { throw new Error("Callback is Required"); }
        const breadthQueue = new Queue();
        let currNode = this.root;

        while(1) {
            callback(currNode.storedData);
            if(currNode.leftChild) {
                breadthQueue.enqueue(currNode.leftChild);
            }
            if(currNode.rightChild) {
                breadthQueue.enqueue(currNode.rightChild);
            }
            if (breadthQueue.queue.length === 0 && currNode) {
                return;
            }
            currNode = breadthQueue.queue[0];
            breadthQueue.dequeue();
        }
    }
    preOrderForEach(callback, root = this.root) {
        if (!callback) { throw new Error("Callback is Required"); }
        callback(root.storedData);
        if (!root.leftChild && !root.rightChild) {
            return;
        }
        if(root.leftChild) {
            this.preOrderForEach(callback, root.leftChild);
        }
        if(root.rightChild) {
            this.preOrderForEach(callback, root.rightChild);
        }
    }
    inOrderForEach(callback, root = this.root) {
        if (!callback) { throw new Error("Callback is Required"); }
        if (!root) {
            return;
        }
        if(root.leftChild) {
            this.inOrderForEach(callback, root.leftChild);
        }
        callback(root.storedData);
        if(root.rightChild) {
            this.inOrderForEach(callback, root.rightChild);
        }
    }
    postOrderForEach(callback, root = this.root) {
        if (!callback) { throw new Error("Callback is Required"); }
        if(!root) {
            return;
        }
        if(root.leftChild) {
            this.postOrderForEach(callback, root.leftChild);
        }
        if (root.rightChild) {
            this.postOrderForEach(callback, root.rightChild);
        }
        callback(root.storedData);
    }
    height(value) {
        // find the value then see how long the longest path down is
        // first find the value
        let currNode = this.root;
        while(1) {
            if (!currNode) {
                return undefined;
            } else if(currNode.storedData > value) {
                currNode = currNode.leftChild;
            } else if (currNode.storedData < value) {
                currNode = currNode.rightChild;
            } else if (currNode.storedData === value) {
                return (this.getHeight(currNode)) - 1;
            }
        }
    }
    getHeight(node) {
        // compare which height his bigger and return that one recursively
        let leftValue;
        let rightValue;
        if (!node.leftChild && !node.rightChild) {
            return 1;
        }
        if (node.leftChild) {
            leftValue = this.getHeight(node.leftChild);
        }
        if (node.rightChild) {
            rightValue = this.getHeight(node.rightChild);
        }
        if (leftValue > rightValue || rightValue === undefined) {
            return ++leftValue;
        } else if (leftValue < rightValue || leftValue === undefined) {
            return ++rightValue;
        } else if (leftValue === rightValue) {
            return ++leftValue;
        }
    }
    depth(value) {
        let currNode = this.root;
        let depth = 0;
        while(1) {
            if (!currNode) {
                return undefined;
            } else if(currNode.storedData < value) {
                currNode = currNode.rightChild;
                depth++;
            } else if (currNode.storedData > value) {
                currNode = currNode.leftChild;
                depth++;
            } else if (currNode.storedData === value) {
                return depth;
            }
        }
    }
}