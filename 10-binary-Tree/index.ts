import { BinaryTree } from "./binaryTree";

function main(): void {
  const tree = new BinaryTree<string>();

  // Insert nodes
  tree.insert("A");
  tree.insert("B");
  tree.insert("C");
  tree.insert("D");
  tree.insert("E");
  tree.insert("F");
  tree.insert("G");
  tree.insert("H");
  tree.insert("I");

  // Display tree structure
  console.log("Tree structure:");
  tree.print();

  // Display tree height
  console.log(`\nHeight: ${tree.height()}`);

  // Display traversals
  console.log("\nTraversals:");
  console.log("Pre-order:");
  tree.preOrder();

  console.log("In-order:");
  tree.inOrder();

  console.log("Post-order:");
  tree.postOrder();
}

// Run the main function
main();
