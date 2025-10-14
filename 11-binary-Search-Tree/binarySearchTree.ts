import { Queue } from "./queue";
class TreeNode<T> {
  data: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}
export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  private _size: number = 0;
  insertNode(data: T) {
    // Simple insert for a BST. Assumes T supports < and > via JavaScript comparison.
    const newNode = new TreeNode(data);
    if (this.root === null) {
      this.root = newNode;
      this._size = 1;
      return;
    }

    let current: TreeNode<T> | null = this.root;
    while (current !== null) {
      // If data is strictly less, go left
      if ((data as any) < (current.data as any)) {
        if (current.left === null) {
          current.left = newNode;
          this._size++;
          return;
        }
        current = current.left;
      } else {
        // Otherwise go right. This puts equal values to the right.
        if (current.right === null) {
          current.right = newNode;
          this._size++;
          return;
        }
        current = current.right;
      }
    }
  }

  // Public API methods for common BST operations
  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  clear(): void {
    this.root = null;
    this._size = 0;
  }

  // Find a node with the given value. Returns true if found.
  contains(value: T): boolean {
    let current = this.root;
    while (current !== null) {
      if ((value as any) === (current.data as any)) return true;
      if ((value as any) < (current.data as any)) current = current.left;
      else current = current.right;
    }
    return false;
  }

  // Get minimum value (left-most node)
  min(): T | null {
    if (this.root === null) return null;
    let current: TreeNode<T> = this.root;
    while (current.left !== null) current = current.left;
    return current.data;
  }

  // Get maximum value (right-most node)
  max(): T | null {
    if (this.root === null) return null;
    let current: TreeNode<T> = this.root;
    while (current.right !== null) current = current.right;
    return current.data;
  }

  // Remove a value from the BST. Returns true if a node was removed.
  // This version is step-by-step and easy to follow for beginners.
  remove(value: T): boolean {
    let current = this.root;
    let parent: TreeNode<T> | null = null;
    let isLeftChild = false;

    // 1. Find the node to remove and its parent
    while (current !== null && (current.data as any) !== (value as any)) {
      parent = current;
      if ((value as any) < (current.data as any)) {
        isLeftChild = true;
        current = current.left;
      } else {
        isLeftChild = false;
        current = current.right;
      }
    }

    // Not found
    if (current === null) return false;

    // 2. Node has no children (leaf)
    if (current.left === null && current.right === null) {
      if (current === this.root) {
        this.root = null;
      } else if (isLeftChild && parent) {
        parent.left = null;
      } else if (parent) {
        parent.right = null;
      }
      this._size--;
      return true;
    }

    // 3. Node has only one child (right)
    if (current.left === null) {
      if (current === this.root) {
        this.root = current.right;
      } else if (isLeftChild && parent) {
        parent.left = current.right;
      } else if (parent) {
        parent.right = current.right;
      }
      this._size--;
      return true;
    }

    // 4. Node has only one child (left)
    if (current.right === null) {
      if (current === this.root) {
        this.root = current.left;
      } else if (isLeftChild && parent) {
        parent.left = current.left;
      } else if (parent) {
        parent.right = current.left;
      }
      this._size--;
      return true;
    }

    // 5. Node has two children
    // Find the inorder successor (smallest in right subtree)
    let successorParent = current;
    let successor = current.right;
    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }
    // Replace current's data with successor's data
    current.data = successor.data;
    // Remove successor node (which has at most one child)
    if (successorParent.left === successor) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }
    this._size--;
    return true;
  }

  // Traversals: inOrder, preOrder, postOrder, levelOrder (BFS)
  inOrder(visitor: (data: T) => void): void {
    const walk = (node: TreeNode<T> | null) => {
      if (node === null) return;
      walk(node.left);
      visitor(node.data);
      walk(node.right);
    };
    walk(this.root);
  }

  preOrder(visitor: (data: T) => void): void {
    const walk = (node: TreeNode<T> | null) => {
      if (node === null) return;
      visitor(node.data);
      walk(node.left);
      walk(node.right);
    };
    walk(this.root);
  }

  postOrder(visitor: (data: T) => void): void {
    const walk = (node: TreeNode<T> | null) => {
      if (node === null) return;
      walk(node.left);
      walk(node.right);
      visitor(node.data);
    };
    walk(this.root);
  }

  // Level-order traversal using the provided Queue
  levelOrder(visitor: (data: T) => void): void {
    if (this.root === null) return;
    const q = new Queue<TreeNode<T>>();
    q.enqueue(this.root);
    while (q.hasData()) {
      const node = q.dequeue()!;
      visitor(node.data);
      if (node.left) q.enqueue(node.left);
      if (node.right) q.enqueue(node.right);
    }
  }

  // Convert tree to a simple string (in-order)
  toString(): string {
    const parts: string[] = [];
    this.inOrder((d) => parts.push(String(d)));
    return parts.join(", ");
  }

  // Pretty-print the tree as a sideways ASCII art string.
  // The root is printed in the middle, right subtree above, left subtree below.
  // This is simple and easy to understand for beginners.
  prettyPrint(): string {
    if (this.root === null) return "(empty)";
    const lines: string[] = [];

    const walk = (
      node: TreeNode<T> | null,
      prefix: string,
      isLeft: boolean
    ) => {
      if (node === null) return;
      // First print right subtree (so it appears above)
      if (node.right)
        walk(node.right, prefix + (isLeft ? "│   " : "    "), false);

      // Print current node
      const connector = isLeft ? "└── " : "┌── ";
      lines.push(prefix + connector + String(node.data));

      // Then print left subtree (so it appears below)
      if (node.left) walk(node.left, prefix + (isLeft ? "    " : "│   "), true);
    };

    // Start with root. For the root we don't want a connector, so handle separately.
    const rootLabel = String(this.root.data);
    // If root has right child, print it first
    if (this.root.right) walk(this.root.right, "", false);
    lines.push(rootLabel);
    if (this.root.left) walk(this.root.left, "", true);

    return lines.join("\n");
  }

  // Convenience method to print to console
  print(): void {
    console.log(this.prettyPrint());
  }
}
