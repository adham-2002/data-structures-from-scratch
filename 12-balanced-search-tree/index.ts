import { BinaryTree } from "./BinaryTree";

const tree = new BinaryTree<number>();

tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(7);

console.log("In-order before balance:");
tree.inOrder();
console.log("Height:", tree.height());

tree.balance();
console.log("In-order after balance:");
tree.inOrder();
console.log("Height:", tree.height());

tree.delete(4);
console.log("After deleting 4:");
tree.inOrder();
