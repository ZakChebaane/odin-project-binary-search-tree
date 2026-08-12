import {Tree} from "./Tree.js";

const myBST = new Tree([1,5,2,1,4,6,7,3,8]);

myBST.prettyPrint();

myBST.deleteItem(4);
myBST.deleteItem(6);
myBST.deleteItem(7);
myBST.deleteItem(2);
myBST.deleteItem(3);
myBST.deleteItem(1);
myBST.deleteItem(5);
myBST.deleteItem(8);

myBST.insert(6);

myBST.prettyPrint();
