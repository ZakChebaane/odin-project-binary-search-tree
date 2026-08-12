import {Tree} from "./Tree.js";

const myBST = new Tree([1,5,2,1,4,6,7,3,8]);

myBST.prettyPrint();

myBST.deleteItem(5);
myBST.deleteItem(6);


myBST.prettyPrint();
