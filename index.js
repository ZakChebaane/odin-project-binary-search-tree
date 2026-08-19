import {Tree} from "./Tree.js";

const myBST = new Tree([1,5,2,1,4,6,7,3,8]);
// const myBST = new Tree([4]);

myBST.insert(6.5);
/*
myBST.insert(3);
myBST.insert(2);
myBST.insert(1);
myBST.insert(5);
myBST.insert(6);
myBST.insert(7);
myBST.insert(8);

 */

myBST.prettyPrint();

// console.log(myBST.height(6));
console.log(myBST.isBalanced());

