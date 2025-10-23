// ===============================
// 🌳 Binary Search Tree (BST) in TypeScript
// Supports: Insert, Delete, Search, Traversals, Height, Manual Balancing
// ===============================

// Node class representing a single node in the tree
class TreeNode<T> {
  data: T; // The actual value of this node
  left: TreeNode<T> | null = null; // Pointer to the left child
  right: TreeNode<T> | null = null; // Pointer to the right child

  constructor(data: T) {
    this.data = data;
  }
}

// Main BinaryTree class (Generic)
export class BinaryTree<T> {
  private root: TreeNode<T> | null = null; // Root node of the tree

  // ===============================
  // 📥 INSERT (BST Insertion)
  // ===============================
  insert(data: T): void {
    this.root = this._insert(this.root, data);
  }

  private _insert(node: TreeNode<T> | null, data: T): TreeNode<T> {
    // If current position is empty → create a new node
    if (!node) return new TreeNode(data);

    // Decide to go left or right
    if (data < node.data) node.left = this._insert(node.left, data);
    else node.right = this._insert(node.right, data);

    return node;
  }

  // ===============================
  // 🔍 SEARCH (Check if value exists)
  // ===============================
  exists(data: T): boolean {
    return this._find(this.root, data) !== null;
  }

  private _find(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
    if (!node) return null;
    if (data === node.data) return node;
    return data < node.data
      ? this._find(node.left, data)
      : this._find(node.right, data);
  }

  // ===============================
  // ❌ DELETE (Remove a node from BST)
  // Handles: Leaf, One Child, Two Children
  // ===============================
  delete(data: T): void {
    this.root = this._delete(this.root, data);
  }

  private _delete(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
    if (!node) return null; // Base case: empty tree

    if (data < node.data) {
      node.left = this._delete(node.left, data); // Go left
    } else if (data > node.data) {
      node.right = this._delete(node.right, data); // Go right
    } else {
      // 🎯 Found the node to delete

      // Case 1: No children (Leaf)
      if (!node.left && !node.right) return null;

      // Case 2: One child only
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Case 3: Two children
      // Find smallest node in the right subtree
      const minLargerNode = this._minValue(node.right);
      // Replace current node’s data with successor’s data
      node.data = minLargerNode.data;
      // Delete the successor node from right subtree
      node.right = this._delete(node.right, minLargerNode.data);
    }
    return node;
  }

  // Helper to find minimum value node (leftmost)
  private _minValue(node: TreeNode<T>): TreeNode<T> {
    while (node.left) node = node.left;
    return node;
  }

  // ===============================
  // ⚖️ BALANCE (Manual balancing)
  // - Rebuilds tree from sorted in-order array
  // ===============================
  balance(): void {
    const values = this._inOrderArray(this.root);
    this.root = this._buildBalanced(values, 0, values.length - 1);
  }

  // Convert tree → sorted array using InOrder traversal
  private _inOrderArray(node: TreeNode<T> | null): T[] {
    if (!node) return [];
    return [
      ...this._inOrderArray(node.left),
      node.data,
      ...this._inOrderArray(node.right),
    ];
  }

  // Recursively build balanced tree from sorted array
  private _buildBalanced(
    values: T[],
    start: number,
    end: number
  ): TreeNode<T> | null {
    console.log(`[buildBalanced] Called with start=${start}, end=${end}`);
    if (start > end) {
      console.log(
        `[buildBalanced] Base case hit: start (${start}) > end (${end}), returning null.`
      );
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    console.log(
      `[buildBalanced] Creating node with value=${values[mid]} at index=${mid}`
    );
    const node = new TreeNode(values[mid]);

    console.log(
      `[buildBalanced] Recursing left: start=${start}, mid-1=${mid - 1}`
    );
    node.left = this._buildBalanced(values, start, mid - 1);
    console.log(
      `[buildBalanced] Recursing right: mid+1=${mid + 1}, end=${end}`
    );
    node.right = this._buildBalanced(values, mid + 1, end);

    console.log(`[buildBalanced] Returning node with value=${node.data}`);
    return node;
  }

  // ===============================
  // 📏 HEIGHT (Depth of tree)
  // ===============================
  height(): number {
    return this._height(this.root);
  }

  private _height(node: TreeNode<T> | null): number {
    if (!node) return 0;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  // ===============================
  // 🌀 TRAVERSALS (InOrder, PreOrder, PostOrder)
  // ===============================

  // InOrder (Left → Root → Right)
  inOrder(): void {
    console.log(this._inOrderList(this.root).join(" -> "));
  }

  private _inOrderList(node: TreeNode<T> | null): T[] {
    if (!node) return [];
    return [
      ...this._inOrderList(node.left),
      node.data,
      ...this._inOrderList(node.right),
    ];
  }

  // PreOrder (Root → Left → Right)
  preOrder(): void {
    console.log(this._preOrderList(this.root).join(" -> "));
  }

  private _preOrderList(node: TreeNode<T> | null): T[] {
    if (!node) return [];
    return [
      node.data,
      ...this._preOrderList(node.left),
      ...this._preOrderList(node.right),
    ];
  }

  // PostOrder (Left → Right → Root)
  postOrder(): void {
    console.log(this._postOrderList(this.root).join(" -> "));
  }

  private _postOrderList(node: TreeNode<T> | null): T[] {
    if (!node) return [];
    return [
      ...this._postOrderList(node.left),
      ...this._postOrderList(node.right),
      node.data,
    ];
  }
}
