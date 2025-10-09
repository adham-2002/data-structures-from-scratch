import { Queue } from "./queue";

class TreeNode<T> {
  data: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class BinaryTree<T> {
  private root: TreeNode<T> | null = null;

  insert(data: T): void {
    const newNode = new TreeNode(data);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.root);

    while (queue.hasData()) {
      const currentNode = queue.dequeue()!;

      if (currentNode.left === null) {
        currentNode.left = newNode;
        break;
      } else {
        queue.enqueue(currentNode.left);
      }

      if (currentNode.right === null) {
        currentNode.right = newNode;
        break;
      } else {
        queue.enqueue(currentNode.right);
      }
    }
  }

  height(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: TreeNode<T> | null): number {
    if (node === null) return 0;

    return (
      1 +
      Math.max(
        this.calculateHeight(node.left),
        this.calculateHeight(node.right)
      )
    );
  }

  preOrder(): void {
    const result: T[] = [];
    this.preOrderTraversal(this.root, result);
    console.log(result.join(" -> "));
  }
  // root left right
  private preOrderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node === null) return;

    result.push(node.data);
    this.preOrderTraversal(node.left, result);
    this.preOrderTraversal(node.right, result);
  }

  inOrder(): void {
    const result: T[] = [];
    this.inOrderTraversal(this.root, result);
    console.log(result.join(" -> "));
  }
  //left root right
  private inOrderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node === null) return;

    this.inOrderTraversal(node.left, result);
    result.push(node.data);
    this.inOrderTraversal(node.right, result);
  }

  postOrder(): void {
    const result: T[] = [];
    this.postOrderTraversal(this.root, result);
    console.log(result.join(" -> "));
  }
  //left right root
  private postOrderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node === null) return;

    this.postOrderTraversal(node.left, result);
    this.postOrderTraversal(node.right, result);
    result.push(node.data);
  }

  print(): void {
    if (this.root === null) {
      console.log("Tree is empty");
      return;
    }

    this.printTree();
  }

  private printTree(): void {
    const levels: T[][] = [];
    const queue = new Queue<{ node: TreeNode<T>; level: number }>();
    queue.enqueue({ node: this.root!, level: 0 });

    while (queue.hasData()) {
      const { node, level } = queue.dequeue()!;

      if (!levels[level]) {
        levels[level] = [];
      }
      levels[level].push(node.data);

      if (node.left) {
        queue.enqueue({ node: node.left, level: level + 1 });
      }
      if (node.right) {
        queue.enqueue({ node: node.right, level: level + 1 });
      }
    }

    // Simple tree visualization
    levels.forEach((level, index) => {
      const indent = " ".repeat((levels.length - index - 1) * 2);
      console.log(`${indent}${level.join("   ")}`);
    });
  }
}
