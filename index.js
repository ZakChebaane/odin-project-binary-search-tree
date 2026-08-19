import {Tree} from "./Tree.js";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const arrBelow100 = [];
const arrAbove100 = [];
for(let i = 0; i < 10; i++) {
    arrBelow100.push(getRandomInt(99));
    let above100 = getRandomInt(200);
    let above = false;
    while (!above) {
        if(above100 > 100) {
            above = true;
        } else {
            above = getRandomInt(200);
        }
    }
    arrAbove100.push(above100);
}

const myBST = new Tree(arrBelow100);

myBST.prettyPrint();
console.log(myBST.isBalanced());
myBST.levelOrderForEach((el) => {
    console.log(el)
});
myBST.preOrderForEach((el) => {
    console.log(el)
});
myBST.postOrderForEach((el) => {
    console.log(el)
});
myBST.inOrderForEach((el) => {
    console.log(el)
});

for(let i = 0; i < arrAbove100.length; i++) {
    myBST.insert(arrAbove100[i]);
}
myBST.prettyPrint();
console.log(myBST.isBalanced());
myBST.rebalance();
myBST.prettyPrint();
console.log(myBST.isBalanced());

myBST.levelOrderForEach((el) => {
    console.log(el)
});
myBST.preOrderForEach((el) => {
    console.log(el)
});
myBST.postOrderForEach((el) => {
    console.log(el)
});
myBST.inOrderForEach((el) => {
    console.log(el)
});