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
  insert(data: T) {
    const newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    const queue = new Queue<TreeNode<T>>();
    queue.enqueue(this.root);
    while (queue.hasData()) {
      const currentNode = queue.dequeue()!;
      if (currentNode?.left === null) {
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
  }
  private preOrderTraversal(node: TreeNode<T> | null, result: T[]): void {
    if (node === null) return;
    result.push(node.data);
    this.preOrderTraversal(node.left, result);
    this.preOrderTraversal(node.right, result);
  }
}
