# 🌳 COMPLETE BST CODE EXPLANATION - ALL OPERATIONS DETAILED

---

## 📖 Table of Contents

1. [TreeNode Class](#treenode-class)
2. [BinaryTree Class Overview](#binarytree-class-overview)
3. [INSERT - Complete Walkthrough](#insert-operation)
4. [SEARCH (exists) - Complete Walkthrough](#search-operation)
5. [DELETE - Complete Walkthrough](#delete-operation)
6. [BALANCE - Complete Walkthrough](#balance-operation)
7. [HEIGHT - Complete Walkthrough](#height-operation)
8. [TRAVERSALS - Complete Walkthrough](#traversals-operation)

---

## TreeNode Class

### What is TreeNode?

A `TreeNode` is a container that holds one piece of data and two pointers (connections) to other nodes.

```typescript
class TreeNode<T> {
  data: T; // The value stored in this node
  left: TreeNode<T> | null = null; // Pointer to LEFT child (smaller values)
  right: TreeNode<T> | null = null; // Pointer to RIGHT child (larger values)

  constructor(data: T) {
    this.data = data;
  }
}
```

### Breaking it down:

```typescript
data: T;
```

- `T` is a **generic type** (could be number, string, etc.)
- This stores the actual value, like `5`, `"hello"`, etc.

```typescript
left: TreeNode<T> | null = null;
```

- Pointer to the left child
- `TreeNode<T>` means "another TreeNode of the same type"
- `| null` means "or it could be null (no left child)"
- `= null` means "start with no left child"

```typescript
right: TreeNode<T> | null = null;
```

- Pointer to the right child
- Same as left, but for the right side

### Analogy: A Box with Labels

```
TreeNode is like a cardboard box:
┌─────────────────────────┐
│                         │
│  [data: 5]              │ ← The value stored
│                         │
│  left: → [Box with 3]   │ ← Pointer to left child
│  right: → [Box with 7]  │ ← Pointer to right child
│                         │
└─────────────────────────┘
```

### Creating a TreeNode

```typescript
const node = new TreeNode(5);

// Now we have:
node.data = 5;
node.left = null;
node.right = null;
```

---

## BinaryTree Class Overview

The `BinaryTree` class manages the entire tree structure. It has:

- **One root pointer**: `private root: TreeNode<T> | null = null;`
- **Multiple methods**: insert, search, delete, balance, height, traversals

```typescript
export class BinaryTree<T> {
  private root: TreeNode<T> | null = null;

  // All methods go here
}
```

**Why `private root`?**

- Users can't access `root` directly
- They must use the public methods like `insert()`, `search()`, etc.
- This protects the tree structure

---

## INSERT OPERATION

### 📥 The Two Functions

```typescript
// ✅ PUBLIC FUNCTION - User calls this
insert(data: T): void {
  this.root = this._insert(this.root, data);
}

// 🔧 PRIVATE HELPER - Does the actual work
private _insert(node: TreeNode<T> | null, data: T): TreeNode<T> {
  if (!node) return new TreeNode(data);

  if (data < node.data)
    node.left = this._insert(node.left, data);
  else
    node.right = this._insert(node.right, data);

  return node;
}
```

### How INSERT works step-by-step

#### **Example: Insert [10, 5, 15, 3, 7]**

### **INSERTION 1: Insert 10**

```
Step 1: User calls tree.insert(10)

Step 2: Executes: this.root = this._insert(this.root, 10)
        - this.root is null (empty tree)
        - Calls: _insert(null, 10)

Step 3: Inside _insert(null, 10):
        - Parameter: node = null, data = 10
        - Check: if (!node) → YES, node is null
        - Execute: return new TreeNode(10)
        - Creates a NEW node with value 10
        - Returns: TreeNode(10)

Step 4: Back in insert():
        - this.root = TreeNode(10)
        - Tree now has a root!

Result:
    10
```

### **INSERTION 2: Insert 5**

```
Step 1: User calls tree.insert(5)

Step 2: Executes: this.root = this._insert(this.root, 5)
        - this.root is TreeNode(10)
        - Calls: _insert(TreeNode(10), 5)

Step 3: Inside _insert(TreeNode(10), 5):
        - Parameter: node = TreeNode(10), data = 5
        - Check: if (!node) → NO, node exists

        - Check: if (5 < 10) → YES, go LEFT
        - Execute: node.left = this._insert(node.left, 5)
        - node.left is null, so calls: _insert(null, 5)

        RECURSIVE CALL #1: _insert(null, 5)
        ├─ node = null, data = 5
        ├─ Check: if (!node) → YES
        ├─ Execute: return new TreeNode(5)
        ├─ Creates node with value 5
        └─ Returns: TreeNode(5)

        Back in previous call:
        - node.left = TreeNode(5) [ASSIGNED!]
        - Now the node has a left child

        - Check: else clause → SKIP (already went left)
        - Execute: return node
        - Returns: TreeNode(10) (the original node, now with left child)

Step 4: Back in insert():
        - this.root = TreeNode(10) [same node, but modified]
        - Tree structure updated

Result:
      10
     /
    5
```

### **INSERTION 3: Insert 15**

```
Step 1: User calls tree.insert(15)

Step 2: Executes: this.root = this._insert(this.root, 15)
        - this.root is TreeNode(10)
        - Calls: _insert(TreeNode(10), 15)

Step 3: Inside _insert(TreeNode(10), 15):
        - Parameter: node = TreeNode(10), data = 15

        - Check: if (!node) → NO

        - Check: if (15 < 10) → NO, go RIGHT (else clause)
        - Execute: node.right = this._insert(node.right, 15)
        - node.right is null, so calls: _insert(null, 15)

        RECURSIVE CALL #1: _insert(null, 15)
        ├─ node = null, data = 15
        ├─ Check: if (!node) → YES
        ├─ Execute: return new TreeNode(15)
        ├─ Creates node with value 15
        └─ Returns: TreeNode(15)

        Back in previous call:
        - node.right = TreeNode(15) [ASSIGNED!]
        - Now the node has a right child
        - Execute: return node
        - Returns: TreeNode(10)

Step 4: Back in insert():
        - this.root = TreeNode(10)

Result:
        10
       /  \
      5    15
```

### **INSERTION 4: Insert 3**

```
Step 1: User calls tree.insert(3)

Step 2: Executes: this.root = this._insert(this.root, 3)
        - this.root is TreeNode(10)
        - Calls: _insert(TreeNode(10), 3)

Step 3: CALL #1: _insert(TreeNode(10), 3)
        - node = TreeNode(10), data = 3
        - Check: if (!node) → NO

        - Check: if (3 < 10) → YES, go LEFT
        - Execute: node.left = this._insert(node.left, 3)
        - node.left is TreeNode(5), so calls: _insert(TreeNode(5), 3)

        CALL #2: _insert(TreeNode(5), 3)
        └─ node = TreeNode(5), data = 3
        └─ Check: if (!node) → NO

        └─ Check: if (3 < 5) → YES, go LEFT
        └─ Execute: node.left = this._insert(node.left, 3)
        └─ node.left is null, so calls: _insert(null, 3)

            CALL #3: _insert(null, 3)
            ├─ node = null, data = 3
            ├─ Check: if (!node) → YES
            ├─ Execute: return new TreeNode(3)
            ├─ Creates node with value 3
            └─ Returns: TreeNode(3)  ✅ FIRST RETURN

        Back in CALL #2:
        └─ node.left = TreeNode(3) [ASSIGNED!]
        └─ Execute: return node
        └─ Returns: TreeNode(5)  ✅ SECOND RETURN

Back in CALL #1:
├─ node.left = TreeNode(5) [already linked, now modified inside]
├─ Execute: return node
├─ Returns: TreeNode(10)  ✅ THIRD RETURN

Back in insert():
├─ this.root = TreeNode(10)

Result:
        10
       /  \
      5    15
     /
    3
```

### **INSERTION 5: Insert 7**

```
Step 1: User calls tree.insert(7)

Step 2: Executes: this.root = this._insert(this.root, 7)
        - Calls: _insert(TreeNode(10), 7)

Step 3: CALL #1: _insert(TreeNode(10), 7)
        - node = TreeNode(10), data = 7
        - Check: if (7 < 10) → YES, go LEFT
        - Execute: node.left = this._insert(node.left, 7)
        - Calls: _insert(TreeNode(5), 7)

        CALL #2: _insert(TreeNode(5), 7)
        └─ node = TreeNode(5), data = 7
        └─ Check: if (7 < 5) → NO, go RIGHT (else)
        └─ Execute: node.right = this._insert(node.right, 7)
        └─ node.right is null, so calls: _insert(null, 7)

            CALL #3: _insert(null, 7)
            ├─ node = null, data = 7
            ├─ Check: if (!node) → YES
            ├─ Execute: return new TreeNode(7)
            └─ Returns: TreeNode(7)  ✅ FIRST RETURN

        Back in CALL #2:
        └─ node.right = TreeNode(7) [ASSIGNED!]
        └─ Execute: return node
        └─ Returns: TreeNode(5)  ✅ SECOND RETURN

Back in CALL #1:
├─ node.left = TreeNode(5) [still same, updated internally]
├─ Execute: return node
├─ Returns: TreeNode(10)  ✅ THIRD RETURN

Result:
        10
       /  \
      5    15
     / \
    3   7
```

### Key Points for INSERT:

1. **Recursion navigates the tree** - we keep going deeper left or right
2. **Base case creates nodes** - when we hit `null`, we create a new node
3. **Returns bubble up** - each level returns the node it processed
4. **Nodes are linked on return** - `node.left = ...` and `node.right = ...` create connections

---

## SEARCH OPERATION

### 🔍 The Two Functions

```typescript
// ✅ PUBLIC FUNCTION - User calls this
exists(data: T): boolean {
  return this._find(this.root, data) !== null;
}

// 🔧 PRIVATE HELPER - Does the actual work
private _find(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
  if (!node) return null;                    // Node not found
  if (data === node.data) return node;       // Found it!
  return data < node.data
    ? this._find(node.left, data)            // Search LEFT
    : this._find(node.right, data);          // Search RIGHT
}
```

### How SEARCH works

**Given tree:**

```
        10
       /  \
      5    15
     / \
    3   7
```

### **Search for 7: tree.exists(7)**

```
Step 1: exists(7) calls: _find(TreeNode(10), 7) !== null

Step 2: CALL #1: _find(TreeNode(10), 7)
        - node = TreeNode(10), data = 7
        - Check: if (!node) → NO, node exists
        - Check: if (7 === 10) → NO, not this node

        - Check: 7 < 10 → YES, search LEFT
        - Return: this._find(node.left, 7)
        - node.left is TreeNode(5), so calls: _find(TreeNode(5), 7)

        CALL #2: _find(TreeNode(5), 7)
        └─ node = TreeNode(5), data = 7
        └─ Check: if (!node) → NO
        └─ Check: if (7 === 5) → NO, not this node

        └─ Check: 7 < 5 → NO, search RIGHT (else)
        └─ Return: this._find(node.right, 7)
        └─ node.right is TreeNode(7), so calls: _find(TreeNode(7), 7)

            CALL #3: _find(TreeNode(7), 7)
            ├─ node = TreeNode(7), data = 7
            ├─ Check: if (!node) → NO
            ├─ Check: if (7 === 7) → YES! FOUND IT! 🎉
            └─ Return: node (return TreeNode(7))

Back in CALL #2:
└─ Gets back: TreeNode(7)
└─ Return: TreeNode(7)

Back in CALL #1:
├─ Gets back: TreeNode(7)
├─ Return: TreeNode(7)

Back in exists():
├─ _find returns TreeNode(7)
├─ Check: TreeNode(7) !== null → TRUE
├─ Return: true

Result: 7 EXISTS IN TREE ✅
```

### **Search for 12: tree.exists(12)**

```
Step 1: exists(12) calls: _find(TreeNode(10), 12) !== null

Step 2: CALL #1: _find(TreeNode(10), 12)
        - node = TreeNode(10), data = 12
        - Check: if (12 === 10) → NO
        - Check: 12 < 10 → NO, search RIGHT (else)
        - Calls: _find(TreeNode(15), 12)

        CALL #2: _find(TreeNode(15), 12)
        └─ node = TreeNode(15), data = 12
        └─ Check: if (12 === 15) → NO

        └─ Check: 12 < 15 → YES, search LEFT
        └─ Calls: _find(null, 12)

            CALL #3: _find(null, 12)
            ├─ node = null
            ├─ Check: if (!node) → YES
            └─ Return: null  ← NOT FOUND

Back in CALL #2:
└─ Gets: null
└─ Return: null

Back in CALL #1:
├─ Gets: null
├─ Return: null

Back in exists():
├─ _find returns null
├─ Check: null !== null → FALSE
├─ Return: false

Result: 12 DOES NOT EXIST ❌
```

### Key Points for SEARCH:

1. **Compare current node** - is it the value we're looking for?
2. **If smaller, go left** - because BST rule: smaller values go left
3. **If larger, go right** - because BST rule: larger values go right
4. **If found, return node** - to indicate success
5. **If null reached, return null** - value doesn't exist

---

## DELETE OPERATION

### ❌ The Most Complex Operation

```typescript
delete(data: T): void {
  this.root = this._delete(this.root, data);
}

private _delete(node: TreeNode<T> | null, data: T): TreeNode<T> | null {
  if (!node) return null; // Base case: empty tree

  if (data < node.data) {
    node.left = this._delete(node.left, data);      // Search LEFT
  } else if (data > node.data) {
    node.right = this._delete(node.right, data);    // Search RIGHT
  } else {
    // 🎯 FOUND THE NODE TO DELETE

    // CASE 1: No children (Leaf node)
    if (!node.left && !node.right) return null;

    // CASE 2: One child only
    if (!node.left) return node.right;              // Has right child
    if (!node.right) return node.left;              // Has left child

    // CASE 3: Two children (MOST COMPLEX)
    const minLargerNode = this._minValue(node.right);      // Find successor
    node.data = minLargerNode.data;                        // Copy successor data
    node.right = this._delete(node.right, minLargerNode.data); // Delete successor
  }

  return node;
}

private _minValue(node: TreeNode<T>): TreeNode<T> {
  while (node.left) node = node.left;  // Keep going left to find minimum
  return node;
}
```

### Why DELETE is Complex

Deleting can break the BST property! Consider:

```
If we delete node 5 from:
        10
       /  \
      5    15
     / \
    3   7

And just remove it:
        10
           \
            15

3 and 7 are now DISCONNECTED! ❌
```

### **CASE 1: Delete a LEAF (no children)**

**Tree:**

```
        10
       /  \
      5    15
     /
    3
```

**Delete 3:**

```
Step 1: User calls tree.delete(3)

Step 2: CALL #1: _delete(TreeNode(10), 3)
        - node = TreeNode(10), data = 3
        - Check: 3 < 10 → YES, search LEFT
        - Calls: _delete(TreeNode(5), 3)

        CALL #2: _delete(TreeNode(5), 3)
        └─ node = TreeNode(5), data = 3
        └─ Check: 3 < 5 → YES, search LEFT
        └─ Calls: _delete(TreeNode(3), 3)

            CALL #3: _delete(TreeNode(3), 3)
            ├─ node = TreeNode(3), data = 3
            ├─ Check: 3 < 3 → NO
            ├─ Check: 3 > 3 → NO
            ├─ else → FOUND IT! 🎯

            ├─ Check: !node.left && !node.right → YES
            ├─ CASE 1: Leaf node
            ├─ Execute: return null
            └─ Returns: null (node deleted)

        Back in CALL #2:
        └─ node.left = null [now disconnects left child]
        └─ Execute: return node
        └─ Returns: TreeNode(5)

Back in CALL #1:
├─ node.left = TreeNode(5) [still points to 5, no change]
├─ Execute: return node
├─ Returns: TreeNode(10)

Result:
        10
       /  \
      5    15

(Node 3 is DELETED) ✅
```

### **CASE 2: Delete a node with ONE CHILD**

**Tree:**

```
        10
       /  \
      5    15
       \
        7
```

**Delete 5 (has only right child):**

```
Step 1: User calls tree.delete(5)

Step 2: CALL #1: _delete(TreeNode(10), 5)
        - node = TreeNode(10), data = 5
        - Check: 5 < 10 → YES, search LEFT
        - Calls: _delete(TreeNode(5), 5)

        CALL #2: _delete(TreeNode(5), 5)
        ├─ node = TreeNode(5), data = 5
        ├─ Check: 5 < 5 → NO
        ├─ Check: 5 > 5 → NO
        ├─ else → FOUND IT! 🎯

        ├─ Check: !node.left → YES (no left child)
        ├─ Check: node.right → YES (has right child)
        ├─ CASE 2 (one child):
        ├─ Execute: return node.right
        └─ Returns: TreeNode(7) ← SKIP node 5, return its child

Back in CALL #1:
├─ node.left = TreeNode(7) ← BYPASSES deleted node!
├─ Execute: return node
├─ Returns: TreeNode(10)

Result:
        10
       /  \
      7    15

(Node 5 is DELETED, 7 takes its place) ✅
```

### **CASE 3: Delete a node with TWO CHILDREN (MOST COMPLEX)**

**Tree:**

```
        10
       /  \
      5    15
     / \   / \
    3   7 12  20
```

**Delete 5 (has both left and right children):**

```
The Challenge:
When we delete 5, we have:
- Left subtree: 3
- Right subtree: 7

How do we keep BOTH?

Solution: Replace with SUCCESSOR
- Find the smallest node in RIGHT subtree (7)
- Copy its value to current node
- Delete the successor
```

```
Step 1: User calls tree.delete(5)

Step 2: CALL #1: _delete(TreeNode(10), 5)
        - node = TreeNode(10), data = 5
        - Check: 5 < 10 → YES, search LEFT
        - Calls: _delete(TreeNode(5), 5)

        CALL #2: _delete(TreeNode(5), 5)
        ├─ node = TreeNode(5), data = 5
        ├─ Check: 5 < 5 → NO
        ├─ Check: 5 > 5 → NO
        ├─ else → FOUND IT! 🎯

        ├─ Check: !node.left && !node.right → NO (has both)
        ├─ Check: !node.left → NO (has left child)
        ├─ Check: !node.right → NO (has right child)

        ├─ CASE 3: Two children!
        ├─ Step 1: Find successor
        ├─ Calls: this._minValue(node.right)
        │
        │ _minValue(TreeNode(7)):
        │ ├─ node = TreeNode(7)
        │ ├─ Loop: while (node.left) → NO, node 7 has no left
        │ ├─ Return: TreeNode(7)
        │ └─ minLargerNode = TreeNode(7)

        ├─ Step 2: Copy successor data
        ├─ node.data = 7 ← NOW NODE HAS VALUE 7, NOT 5!
        │ (But still linked to both children)

        ├─ Step 3: Delete the successor from right subtree
        ├─ Calls: _delete(node.right, 7)
        ├─ This calls: _delete(TreeNode(7), 7)

            CALL #3: _delete(TreeNode(7), 7)
            ├─ node = TreeNode(7), data = 7
            ├─ Check: 7 < 7 → NO
            ├─ Check: 7 > 7 → NO
            ├─ else → FOUND IT! 🎯

            ├─ Check: !node.left && !node.right → YES
            ├─ CASE 1: Leaf node
            ├─ Execute: return null
            └─ Returns: null

        Back in CALL #2:
        ├─ node.right = null ← RIGHT CHILD IS NOW DELETED
        ├─ Execute: return node
        └─ Returns: TreeNode (with data=7, left=3, right=null)

Back in CALL #1:
├─ node.left = [Node with data=7]
├─ Execute: return node
└─ Returns: TreeNode(10)

Result:
        10
       /  \
      7    15  ← Note: 5 is GONE, replaced by 7
     /    / \
    3    12  20

(Node 5 is DELETED, its successor 7 took its place) ✅
(The original node 7 is also deleted from the right)
```

### Key Points for DELETE:

1. **CASE 1 (Leaf)**: Just return null - simple removal
2. **CASE 2 (One child)**: Return the child - bypass the node
3. **CASE 3 (Two children)**: Find successor (smallest in right subtree), copy its data, delete the successor
4. **Why successor?** - It's the smallest value in the right subtree, so it's larger than everything on the left and smaller than everything else on the right!

---

## BALANCE OPERATION

### ⚖️ Creating a Balanced Tree

**Problem:** If we insert sorted data [1,2,3,4,5], we get a skewed tree:

```
Unbalanced (like a linked list):
    1
     \
      2
       \
        3
         \
          4
           \
            5

This is INEFFICIENT! Search is O(n) instead of O(log n).
```

**Solution:** Rebuild the tree from sorted data, always putting middle value as root:

```
Balanced:
        3
       / \
      2   4
     /     \
    1       5

Much better! All nodes are roughly at the same depth.
```

### The Code

```typescript
balance(): void {
  const values = this._inOrderArray(this.root);  // Get sorted values
  this.root = this._buildBalanced(values, 0, values.length - 1);
}

private _inOrderArray(node: TreeNode<T> | null): T[] {
  if (!node) return [];
  return [
    ...this._inOrderArray(node.left),      // Left subtree
    node.data,                              // Current node
    ...this._inOrderArray(node.right),     // Right subtree
  ];
}

private _buildBalanced(
  values: T[],
  start: number,
  end: number
): TreeNode<T> | null {
  if (start > end) return null;  // Base case

  const mid = Math.floor((start + end) / 2);
  const node = new TreeNode(values[mid]);  // Middle value as root

  node.left = this._buildBalanced(values, start, mid - 1);      // Left half
  node.right = this._buildBalanced(values, mid + 1, end);       // Right half

  return node;
}
```

### Step-by-Step Example

**Unbalanced tree: [1, 2, 3, 4, 5]**

```
Step 1: User calls tree.balance()

Step 2: Call _inOrderArray(root)
        Returns: [1, 2, 3, 4, 5]

Step 3: Call _buildBalanced([1,2,3,4,5], 0, 4)

        CALL #1: _buildBalanced([1,2,3,4,5], 0, 4)
        ├─ start=0, end=4
        ├─ Check: 0 > 4 → NO
        ├─ mid = floor((0+4)/2) = 2
        ├─ values[2] = 3
        ├─ Create: node = TreeNode(3)

        ├─ Call left: _buildBalanced([1,2,3,4,5], 0, 1)
        │
        │ CALL #2: _buildBalanced([1,2,3,4,5], 0, 1)
        │ ├─ start=0, end=1
        │ ├─ mid = floor((0+1)/2) = 0
        │ ├─ values[0] = 1
        │ ├─ Create: node = TreeNode(1)
        │ ├─ Call left: _buildBalanced([...], 0, -1) → NULL
        │ ├─ Call right: _buildBalanced([...], 1, 1)
        │ │
        │ │ CALL #3: _buildBalanced([1,2,3,4,5], 1, 1)
        │ │ ├─ start=1, end=1
        │ │ ├─ mid = 1
        │ │ ├─ values[1] = 2
        │ │ ├─ Create: node = TreeNode(2)
        │ │ ├─ Call left: _buildBalanced([...], 1, 0) → NULL
        │ │ ├─ Call right: _buildBalanced([...], 2, 1) → NULL
        │ │ ├─ Return: TreeNode(2)
        │ │
        │ ├─ node.right = TreeNode(2)
        │ ├─ Return: TreeNode(1)
        │
        ├─ node.left = TreeNode(1)

        ├─ Call right: _buildBalanced([1,2,3,4,5], 3, 4)
        │
        │ CALL #4: _buildBalanced([1,2,3,4,5], 3, 4)
        │ ├─ start=3, end=4
        │ ├─ mid = floor((3+4)/2) = 3
        │ ├─ values[3] = 4
        │ ├─ Create: node = TreeNode(4)
        │ ├─ Call left: _buildBalanced([...], 3, 2) → NULL
        │ ├─ Call right: _buildBalanced([...], 4, 4)
        │ │
        │ │ CALL #5: _buildBalanced([1,2,3,4,5], 4, 4)
        │ │ ├─ start=4, end=4
        │ │ ├─ mid = 4
        │ │ ├─ values[4] = 5
        │ │ ├─ Create: node = TreeNode(5)
        │ │ ├─ Call left: NULL
        │ │ ├─ Call right: _buildBalanced([...], 5, 4) → NULL
        │ │ ├─ Return: TreeNode(5)
        │ │
        │ ├─ node.right = TreeNode(5)
        │ ├─ Return: TreeNode(4)
        │
        ├─ node.right = TreeNode(4)

        ├─ Return: TreeNode(3)

Step 4: this.root = TreeNode(3)

Balanced tree created:
        3
       / \
      1   4
       \   \
        2   5
```

### Key Points for BALANCE:

1. **InOrder traversal** gives us sorted values
2. **Find middle** of range
3. **Make middle node** the root
4. **Recursively balance** left and right halves
5. **Result**: Perfectly balanced tree!

---

## HEIGHT OPERATION

### 📏 How Deep is the Tree?

```typescript
height(): number {
  return this._height(this.root);
}

private _height(node: TreeNode<T> | null): number {
  if (!node) return 0;  // Empty tree has height 0
  return 1 + Math.max(
    this._height(node.left),      // Height of left subtree
    this._height(node.right)      // Height of right subtree
  );
}
```

### How HEIGHT works

**Tree:**

```
        3
       / \
      1   4
       \   \
        2   5
```

**Call tree.height():**

```
Step 1: height() calls _height(TreeNode(3))

Step 2: CALL #1: _height(TreeNode(3))
        - node = TreeNode(3)
        - Check: !node → NO
        - Call: 1 + Math.max(
            _height(node.left),
            _height(node.right)
          )

        - Calls _height(TreeNode(1))

        CALL #2: _height(TreeNode(1))
        ├─ node = TreeNode(1)
        ├─ Check: !node → NO
        ├─ Call: 1 + Math.max(
        │   _height(node.left),    ← null
        │   _height(node.right)    ← TreeNode(2)
        │ )

        ├─ Call _height(null)
        │
        │ CALL #3: _height(null)
        │ ├─ node = null
        │ ├─ Check: !node → YES
        │ └─ Return: 0  ← Base case

        ├─ Call _height(TreeNode(2))
        │
        │ CALL #4: _height(TreeNode(2))
        │ ├─ node = TreeNode(2)
        │ ├─ Check: !node → NO
        │ ├─ Call: 1 + Math.max(
        │ │   _height(null),      ← 0
        │ │   _height(null)       ← 0
        │ │ )
        │ ├─ Both children are null
        │ ├─ Return: 1 + Math.max(0, 0) = 1  ← Leaf node

        ├─ Math.max(0, 1) = 1
        ├─ Return: 1 + 1 = 2

        - Now call _height(TreeNode(4))

        CALL #5: _height(TreeNode(4))
        ├─ Similar process...
        ├─ Return: 2

        - Math.max(2, 2) = 2
        - Return: 1 + 2 = 3

Step 3: height() returns 3
```

**Why the result is 3:**

```
3 levels in the tree:
Level 1:     3      ← Height 1
            / \
Level 2:   1   4    ← Height 2
            \ / \
Level 3:    2 5    ← Height 3 (deepest)

Total height = 3
```

### Key Points for HEIGHT:

1. **Empty tree** = height 0
2. **Leaf node** = height 1
3. **Each level adds 1** to the height
4. **Take maximum** of left and right heights
5. **Height of node** = 1 + max(left height, right height)

---

## TRAVERSALS OPERATION

### 🌀 Walking Through the Tree (Different Orders)

There are **3 main traversal orders**:

1. **InOrder**: Left → Root → Right (gives SORTED values)
2. **PreOrder**: Root → Left → Right (useful for copying tree)
3. **PostOrder**: Left → Right → Root (useful for deleting tree)

```typescript
// ============ InOrder ============
inOrder(): void {
  console.log(this._inOrderList(this.root).join(" -> "));
}

private _inOrderList(node: TreeNode<T> | null): T[] {
  if (!node) return [];
  return [
    ...this._inOrderList(node.left),      // LEFT
    node.data,                             // ROOT
    ...this._inOrderList(node.right),     // RIGHT
  ];
}

// ============ PreOrder ============
preOrder(): void {
  console.log(this._preOrderList(this.root).join(" -> "));
}

private _preOrderList(node: TreeNode<T> | null): T[] {
  if (!node) return [];
  return [
    node.data,                             // ROOT
    ...this._preOrderList(node.left),     // LEFT
    ...this._preOrderList(node.right),    // RIGHT
  ];
}

// ============ PostOrder ============
postOrder(): void {
  console.log(this._postOrderList(this.root).join(" -> "));
}

private _postOrderList(node: TreeNode<T> | null): T[] {
  if (!node) return [];
  return [
    ...this._postOrderList(node.left),    // LEFT
    ...this._postOrderList(node.right),   // RIGHT
    node.data,                             // ROOT
  ];
}
```

### Example Tree

```
        10
       /  \
      5    15
     / \   / \
    3   7 12  20
```

### **InOrder Traversal: [3, 5, 7, 10, 12, 15, 20]**

```
Process:
1. Go to 10
2. First, traverse LEFT subtree of 10
   - Go to 5
   - First, traverse LEFT subtree of 5
     - Go to 3
     - 3 has no left
     - OUTPUT: 3 ← First!
     - 3 has no right
   - Back to 5
   - OUTPUT: 5 ← Process root
   - Traverse RIGHT subtree of 5
     - Go to 7
     - 7 has no left
     - OUTPUT: 7 ← Got 7
     - 7 has no right
3. Back to 10
4. OUTPUT: 10 ← Got root
5. Traverse RIGHT subtree of 10
   - Go to 15
   - LEFT subtree of 15
     - Go to 12
     - OUTPUT: 12
   - OUTPUT: 15
   - RIGHT subtree of 15
     - Go to 20
     - OUTPUT: 20

Result: [3, 5, 7, 10, 12, 15, 20] ✅ SORTED!
```

### **PreOrder Traversal: [10, 5, 3, 7, 15, 12, 20]**

```
Process:
1. Go to 10
2. OUTPUT: 10 ← Root FIRST
3. Traverse LEFT: 5
4. OUTPUT: 5 ← Root
5. Traverse LEFT: 3
6. OUTPUT: 3
7. Traverse RIGHT: 7
8. OUTPUT: 7
9. Traverse RIGHT: 15
10. OUTPUT: 15
11. Traverse LEFT: 12
12. OUTPUT: 12
13. Traverse RIGHT: 20
14. OUTPUT: 20

Result: [10, 5, 3, 7, 15, 12, 20]
Note: Root comes FIRST
```

### **PostOrder Traversal: [3, 7, 5, 12, 20, 15, 10]**

```
Process:
1. Go to 10
2. Traverse LEFT: 5
3. Traverse LEFT: 3
4. No left/right for 3
5. OUTPUT: 3
6. Back to 5, traverse RIGHT: 7
7. No left/right for 7
8. OUTPUT: 7
9. Back to 5
10. OUTPUT: 5 ← Root LAST
11. Traverse RIGHT: 15
12. Traverse LEFT: 12
13. OUTPUT: 12
14. Back to 15, traverse RIGHT: 20
15. OUTPUT: 20
16. Back to 15
17. OUTPUT: 15
18. Back to 10
19. OUTPUT: 10 ← Root LAST

Result: [3, 7, 5, 12, 20, 15, 10]
Note: Root comes LAST
```

### When to Use Each Traversal

| Traversal     | Use Case            | Result                               |
| ------------- | ------------------- | ------------------------------------ |
| **InOrder**   | Get sorted values   | [3, 5, 7, 10, 12, 15, 20]            |
| **PreOrder**  | Copy tree structure | Root first, useful for serialization |
| **PostOrder** | Delete tree safely  | Process children before parent       |

### Key Points for TRAVERSALS:

1. **InOrder** = Sorted output (great for debugging!)
2. **PreOrder** = Root processed first (copy/backup)
3. **PostOrder** = Root processed last (deletion)
4. **All use recursion** - go deeper, then process
5. **Spread operator `...`** merges arrays together

---

## Summary - The Whole Picture

| Operation      | Purpose         | Time       | Returns |
| -------------- | --------------- | ---------- | ------- |
| **INSERT**     | Add value       | O(log n)   | void    |
| **SEARCH**     | Find value      | O(log n)   | boolean |
| **DELETE**     | Remove value    | O(log n)   | void    |
| **BALANCE**    | Fix skewed tree | O(n log n) | void    |
| **HEIGHT**     | Get tree depth  | O(n)       | number  |
| **TRAVERSALS** | Visit all nodes | O(n)       | void    |

---

## Final Exercise

Given the tree:

```
        50
       /  \
      30   70
     / \   / \
    20 40 60  80
```

Try to:

1. Trace inserting 35
2. Trace searching for 40
3. Trace deleting 30
4. Trace the InOrder traversal
5. Calculate the height

This will cement your understanding! 🌳✨
