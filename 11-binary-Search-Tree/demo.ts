import { BinarySearchTree } from "./binarySearchTree";

const bst = new BinarySearchTree<number>();

// Insert some numbers
[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach((n) => bst.insertNode(n));

console.log("Size:", bst.size());
console.log("In-order (sorted):", bst.toString());
console.log("Tree shape:");
bst.print();

console.log("Contains 6?", bst.contains(6));
console.log("Contains 2?", bst.contains(2));

console.log("Min:", bst.min());
console.log("Max:", bst.max());

console.log("Pre-order:");
bst.preOrder((d) => console.log(d));

console.log("Level-order:");
bst.levelOrder((d) => console.log(d));

console.log("Removing 10 (has one child)", bst.remove(10));
console.log("Removing 3 (has two children)", bst.remove(3));
console.log("After removals, in-order:", bst.toString());
console.log("After removals, tree shape:");
bst.print();
console.log("Size after removals:", bst.size());
