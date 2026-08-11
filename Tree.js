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
        
        return arr;
    }
}