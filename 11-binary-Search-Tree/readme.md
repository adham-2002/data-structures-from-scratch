# Binary Search Tree (BST) Implementation

## 📚 Table of Contents

- [What is a Binary Search Tree?](#what-is-a-binary-search-tree)
- [Real-World Analogies](#real-world-analogies)
- [Architecture & Structure](#architecture--structure)
- [Class Diagram](#class-diagram)
- [Tree Operations](#tree-operations)
- [Time & Space Complexity](#time--space-complexity)
- [Visual Examples](#visual-examples)
- [Code Usage](#code-usage)
- [Practice Exercises](#practice-exercises)

---

## 🌳 What is a Binary Search Tree?

A **Binary Search Tree (BST)** is a tree data structure where:

1. Each node has at most **2 children** (left and right)
2. **Left child** < **Parent** < **Right child** (ordering property)
3. Both left and right subtrees are also BSTs

### 🎯 Key Properties:

- **Ordered Structure**: All values in left subtree < node < all values in right subtree
- **Efficient Search**: Average O(log n) search time
- **Dynamic**: Can grow and shrink efficiently
- **In-Order Traversal**: Produces sorted sequence

---

## 🌍 Real-World Analogies

### 1. **Family Tree** 🏠

```
        Grandparent (50)
       /              \
   Parent (30)    Parent (70)
   /      \          /      \
Child(20) Child(40) Child(60) Child(80)
```

Each person has at most 2 children, organized by age.

### 2. **Filing Cabinet** 📁

```
        M (Middle drawer)
       /                \
   A-L (Top)         N-Z (Bottom)
   /    \             /      \
A-F   G-L         N-S      T-Z
```

Documents organized alphabetically for quick search.

### 3. **Tournament Bracket** 🏆

```
        Winner
       /      \
   Semi1     Semi2
   /  \      /   \
Q1   Q2   Q3    Q4
```

Each match has 2 competitors, winner moves up.

---

## 🏗️ Architecture & Structure

### File Structure

```
11-binary-Search-Tree/
├── binarySearchTree.ts  (Main BST implementation)
├── queue.ts             (Helper for level-order traversal)
├── demo.ts              (Usage examples)
└── README.md            (This file)
```

---

## 📊 Class Diagram

```plaintext
┌─────────────────────────────┐
│      TreeNode<T>            │
├─────────────────────────────┤
│ + data: T                   │
│ + left: TreeNode<T> | null  │
│ + right: TreeNode<T> | null │
├─────────────────────────────┤
│ + constructor(data: T)      │
└─────────────────────────────┘
          △
          │ contains
          │
┌─────────────────────────────────────────┐
│     BinarySearchTree<T>                 │
├─────────────────────────────────────────┤
│ - root: TreeNode<T> | null              │
│ - _size: number                         │
├─────────────────────────────────────────┤
│ + insertNode(data: T): void             │
│ + remove(value: T): boolean             │
│ + contains(value: T): boolean           │
│ + min(): T | null                       │
│ + max(): T | null                       │
│ + size(): number                        │
│ + isEmpty(): boolean                    │
│ + clear(): void                         │
│ + inOrder(visitor): void                │
│ + preOrder(visitor): void               │
│ + postOrder(visitor): void              │
│ + levelOrder(visitor): void             │
│ + toString(): string                    │
│ + prettyPrint(): string                 │
│ + print(): void                         │
└─────────────────────────────────────────┘
          │ uses
          ▼
┌─────────────────────────────┐
│       Queue<T>              │
├─────────────────────────────┤
│ - dataList: T[]             │
├─────────────────────────────┤
│ + enqueue(data: T): void    │
│ + dequeue(): T | undefined  │
│ + peek(): T | undefined     │
│ + hasData(): boolean        │
│ + size(): number            │
└─────────────────────────────┘
```

### Class Relationships:

- **TreeNode**: Basic building block, stores data and references to left/right children
- **BinarySearchTree**: Main class managing the tree structure
- **Queue**: Helper class for level-order (breadth-first) traversal

---

## 🔧 Tree Operations

### 1. **Insert Operation**

**How it works:**

1. Start at root
2. Compare value with current node
3. If smaller → go left, if larger → go right
4. Repeat until finding an empty spot
5. Insert new node there

**Visual Example:**

```
Insert: 8, 3, 10, 1, 6

Step 1: Insert 8
    8

Step 2: Insert 3 (3 < 8, go left)
    8
   /
  3

Step 3: Insert 10 (10 > 8, go right)
    8
   / \
  3   10

Step 4: Insert 1 (1 < 8, go left; 1 < 3, go left)
    8
   / \
  3   10
 /
1

Step 5: Insert 6 (6 < 8, go left; 6 > 3, go right)
    8
   / \
  3   10
 / \
1   6
```

**Code:**

```typescript
bst.insertNode(8);
bst.insertNode(3);
bst.insertNode(10);
bst.insertNode(1);
bst.insertNode(6);
```

---

### 2. **Search Operation**

**How it works:**

1. Start at root
2. Compare target with current node
3. If equal → found!
4. If smaller → search left
5. If larger → search right
6. If null → not found

**Visual Example:**

```
Search for 6 in:
    8
   / \
  3   10
 / \
1   6

Path: 8 → 3 → 6 ✓ (Found!)

Search for 7:
Path: 8 → 3 → 6 → null ✗ (Not found)
```

**Code:**

```typescript
bst.contains(6); // true
bst.contains(7); // false
```

---

### 3. **Delete Operation**

**Three cases:**

#### Case 1: Node has **no children** (Leaf)

```
Before:          After:
    8               8
   / \             / \
  3   10          3   10
 /
1   ← Delete    (simply remove)
```

#### Case 2: Node has **one child**

```
Before:          After:
    8               8
   / \             / \
  3   10          4   10
   \
    4  ← Delete 3  (replace with child)
```

#### Case 3: Node has **two children**

```
Before:          After:
    8               8
   / \             / \
  3   10          4   10
 / \    \        /     \
1   6   14      1      14
   / \
  4   7  ← Delete 3   (replace with successor 4)
```

**Steps for Case 3:**

1. Find **inorder successor** (smallest value in right subtree)
2. Replace node's data with successor's data
3. Delete successor node (will be Case 1 or 2)

**Code:**

```typescript
bst.remove(1); // Case 1: Leaf
bst.remove(3); // Case 3: Two children
bst.remove(10); // Case 2: One child
```

---

### 4. **Traversal Operations**

#### **In-Order Traversal** (Left → Root → Right)

- Produces **sorted** output
- Use case: Get all values in order

```
Tree:     8
         / \
        3   10
       / \
      1   6

In-Order: 1, 3, 6, 8, 10 (Sorted!)
```

#### **Pre-Order Traversal** (Root → Left → Right)

- Use case: Copy tree structure

```
Pre-Order: 8, 3, 1, 6, 10
```

#### **Post-Order Traversal** (Left → Right → Root)

- Use case: Delete tree (delete children first)

```
Post-Order: 1, 6, 3, 10, 8
```

#### **Level-Order Traversal** (Breadth-First)

- Use case: Print tree by levels

```
Level-Order: 8, 3, 10, 1, 6
```

**Traversal Diagram:**

```
        8          Level 0
       / \
      3   10       Level 1
     / \
    1   6          Level 2

In-Order:    [1, 3, 6, 8, 10]
Pre-Order:   [8, 3, 1, 6, 10]
Post-Order:  [1, 6, 3, 10, 8]
Level-Order: [8, 3, 10, 1, 6]
```

---

## ⏱️ Time & Space Complexity

| Operation       | Average Case | Worst Case | Best Case | Space      |
| --------------- | ------------ | ---------- | --------- | ---------- |
| **Insert**      | O(log n)     | O(n)\*     | O(1)      | O(1)       |
| **Search**      | O(log n)     | O(n)\*     | O(1)      | O(1)       |
| **Delete**      | O(log n)     | O(n)\*     | O(1)      | O(1)       |
| **Min/Max**     | O(log n)     | O(n)\*     | O(1)      | O(1)       |
| **In-Order**    | O(n)         | O(n)       | O(n)      | O(h)\*\*   |
| **Pre-Order**   | O(n)         | O(n)       | O(n)      | O(h)\*\*   |
| **Post-Order**  | O(n)         | O(n)       | O(n)      | O(h)\*\*   |
| **Level-Order** | O(n)         | O(n)       | O(n)      | O(w)\*\*\* |

\* Worst case O(n) occurs with **unbalanced** tree (like a linked list)  
\*\* O(h) where h = height (recursion stack)  
\*\*\* O(w) where w = maximum width at any level

### Balanced vs Unbalanced Trees

**Balanced Tree** (Good! O(log n)):

```
      8
     / \
    3   10
   / \
  1   6
```

Height = 3

**Unbalanced Tree** (Bad! O(n)):

```
1
 \
  3
   \
    6
     \
      8
       \
        10
```

Height = 5 (like a linked list!)

---

## 📖 Visual Examples

### Example 1: Building a BST

```typescript
const bst = new BinarySearchTree<number>();
[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach((n) => bst.insertNode(n));
bst.print();
```

**Output:**

```
        ┌── 14
        │   └── 13
    10
8
    │       ┌── 7
    │   6
    │   │   └── 4
    3
        └── 1
```

### Example 2: Finding Min/Max

```typescript
console.log("Min:", bst.min()); // 1 (leftmost)
console.log("Max:", bst.max()); // 14 (rightmost)
```

**Visual:**

```
        14 ← MAX (rightmost)
       /
      13
     /
    10
   /
  8
 /
3
/
1 ← MIN (leftmost)
```

### Example 3: Searching

```typescript
console.log("Contains 6?", bst.contains(6)); // true
console.log("Contains 100?", bst.contains(100)); // false
```

**Search Path for 6:**

```
Start at 8
  ↓ (6 < 8, go left)
Go to 3
  ↓ (6 > 3, go right)
Go to 6
  ✓ Found!
```

### Example 4: Deletion

```typescript
bst.remove(10); // Has one child (14)
bst.remove(3); // Has two children (1, 6)
bst.print();
```

**Before:**

```
        ┌── 14
    10
8
    │       ┌── 7
    │   6
    │   │   └── 4
    3
        └── 1
```

**After:**

```
        14
8
    │       ┌── 7
    │   6
    │   │   └── 4
    4
        └── 1
```

---

## 💻 Code Usage

### Basic Operations

```typescript
import { BinarySearchTree } from "./binarySearchTree";

// 1. Create a BST
const bst = new BinarySearchTree<number>();

// 2. Insert values
bst.insertNode(50);
bst.insertNode(30);
bst.insertNode(70);
bst.insertNode(20);
bst.insertNode(40);
bst.insertNode(60);
bst.insertNode(80);

// 3. Check size
console.log("Size:", bst.size()); // 7

// 4. Search for values
console.log("Contains 40?", bst.contains(40)); // true
console.log("Contains 100?", bst.contains(100)); // false

// 5. Find min/max
console.log("Min:", bst.min()); // 20
console.log("Max:", bst.max()); // 80

// 6. Print tree structure
bst.print();

// 7. Get sorted array (in-order)
console.log("Sorted:", bst.toString()); // "20, 30, 40, 50, 60, 70, 80"

// 8. Delete values
bst.remove(30);
bst.remove(70);

// 9. Check if empty
console.log("Is empty?", bst.isEmpty()); // false

// 10. Clear all
bst.clear();
console.log("Is empty?", bst.isEmpty()); // true
```

### Traversal Examples

```typescript
const bst = new BinarySearchTree<number>();
[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach((n) => bst.insertNode(n));

// In-Order (sorted)
console.log("In-Order:");
bst.inOrder((data) => console.log(data));
// Output: 1, 3, 4, 6, 7, 8, 10, 13, 14

// Pre-Order
console.log("Pre-Order:");
bst.preOrder((data) => console.log(data));
// Output: 8, 3, 1, 6, 4, 7, 10, 14, 13

// Post-Order
console.log("Post-Order:");
bst.postOrder((data) => console.log(data));
// Output: 1, 4, 7, 6, 3, 13, 14, 10, 8

// Level-Order (breadth-first)
console.log("Level-Order:");
bst.levelOrder((data) => console.log(data));
// Output: 8, 3, 10, 1, 6, 14, 4, 7, 13
```

### Custom Data Types

```typescript
interface Person {
  name: string;
  age: number;
}

// Need custom comparison
const personBST = new BinarySearchTree<Person>();
// Note: This requires modifying the comparison logic
// or using a comparator function
```

---

## 🎓 Key Concepts

### 1. **BST Property**

- **Left subtree** < **Parent** < **Right subtree**
- This property must be maintained for **all nodes**

```
Valid BST:     Invalid BST:
    8              8
   / \            / \
  3   10         3   10
 / \            / \
1   6          1   9  ← 9 should be in right subtree!
```

### 2. **Inorder Successor**

- Smallest value in **right subtree**
- Used for deleting nodes with two children

```
Tree:     8
         / \
        3   10
       / \    \
      1   6   14
         / \
        4   7

Inorder Successor of 3 = 4
(smallest in right subtree of 3)
```

### 3. **Balanced vs Unbalanced**

**Balanced** (Efficient):

```
      8           Height = 3
     / \          Operations: O(log n)
    3   10
   / \
  1   6
```

**Unbalanced** (Inefficient):

```
1               Height = 5
 \              Operations: O(n)
  3
   \
    6
     \
      8
       \
        10
```

**Solution**: Use **self-balancing trees** (AVL, Red-Black)

---

## 🚀 Running the Demo

```bash
# Navigate to directory
cd "a:\MyGitHub2024\data-structures-from-scratch\11-binary-Search-Tree"

# Run the demo
ts-node demo.ts
```

**Expected Output:**

```
Size: 9
In-order (sorted): 1, 3, 4, 6, 7, 8, 10, 13, 14
Tree shape:
        ┌── 14
        │   └── 13
    10
8
    │       ┌── 7
    │   6
    │   │   └── 4
    3
        └── 1

Contains 6? true
Contains 2? false
Min: 1
Max: 14
...
```

---

## 🧪 Practice Exercises

### Beginner Level:

1. **Insert Exercise**: Build a BST with values [15, 10, 20, 8, 12, 17, 25]

   - Draw the tree on paper
   - Verify with `print()`

2. **Search Exercise**: For the above tree:

   - Find the path to search for 12
   - Find the path to search for 9 (not found)

3. **Traversal Exercise**: For the above tree:
   - Predict in-order output
   - Predict pre-order output
   - Verify with code

### Intermediate Level:

4. **Delete Exercise**: From the above tree:

   - Delete 10 (has two children)
   - Draw the resulting tree
   - Verify with code

5. **Min/Max Exercise**:

   - Find min and max without using the methods
   - Write your logic on paper
   - Compare with `min()` and `max()`

6. **Count Exercise**: Write a method to count:
   - Total nodes
   - Leaf nodes
   - Nodes with only one child

### Advanced Level:

7. **Height Exercise**: Calculate tree height

   ```typescript
   height(): number {
     // Your code here
   }
   ```

8. **Validate Exercise**: Check if a tree is a valid BST

   ```typescript
   isValidBST(): boolean {
     // Your code here
   }
   ```

9. **Level Width Exercise**: Find maximum width of any level

   ```typescript
   maxWidth(): number {
     // Your code here
   }
   ```

10. **Mirror Exercise**: Create a mirror image of the tree
    ```typescript
    mirror(): void {
      // Swap all left and right children
    }
    ```

---

## 🎯 Common Use Cases

### 1. **Sorted Data Storage**

```typescript
// Store and retrieve data in sorted order
const dictionary = new BinarySearchTree<string>();
["dog", "cat", "bird", "elephant"].forEach((w) => dictionary.insertNode(w));
dictionary.inOrder((word) => console.log(word));
// Output: bird, cat, dog, elephant (sorted!)
```

### 2. **Range Queries**

```typescript
// Find all values between min and max
function findInRange(tree, min, max) {
  const result = [];
  tree.inOrder((value) => {
    if (value >= min && value <= max) {
      result.push(value);
    }
  });
  return result;
}
```

### 3. **Auto-Complete**

```typescript
// Find all words with a prefix
function autoComplete(tree, prefix) {
  const result = [];
  tree.inOrder((word) => {
    if (word.startsWith(prefix)) {
      result.push(word);
    }
  });
  return result;
}
```

### 4. **Priority Systems**

```typescript
// Manage tasks by priority
interface Task {
  priority: number;
  name: string;
}

const taskTree = new BinarySearchTree<Task>();
// Insert tasks, always process highest priority first
```

---

## 🔍 Implementation Highlights

### 1. **Generic Type Support**

```typescript
// Works with any comparable type
const numberTree = new BinarySearchTree<number>();
const stringTree = new BinarySearchTree<string>();
```

### 2. **Pretty Print**

```typescript
bst.print(); // ASCII art visualization
```

Output:

```
        ┌── 14
    10
8
    └── 3
```

### 3. **Visitor Pattern**

```typescript
// Flexible traversal with custom operations
bst.inOrder((data) => {
  // Do whatever you want with data
  console.log(data * 2);
});
```

### 4. **Size Tracking**

```typescript
// O(1) size check (no need to count)
console.log(bst.size()); // Instant!
```

---

## 📚 Additional Resources

### Learn More:

- [Visualgo BST Visualization](https://visualgo.net/en/bst)
- [GeeksforGeeks BST Tutorial](https://www.geeksforgeeks.org/binary-search-tree-data-structure/)
- [YouTube: BST Explained](https://www.youtube.com/results?search_query=binary+search+tree)

### Related Data Structures:

- **AVL Tree**: Self-balancing BST
- **Red-Black Tree**: Another self-balancing BST
- **B-Tree**: Used in databases
- **Heap**: Complete binary tree (not BST)

---

## 🤝 Contributing

Found a bug or want to improve this? Feel free to contribute!

---

## 📝 Summary

**Binary Search Tree** is a fundamental data structure that:

- ✅ Maintains sorted order
- ✅ Provides efficient O(log n) operations (when balanced)
- ✅ Supports multiple traversal methods
- ✅ Is the foundation for many advanced structures

**Remember:**

- Left < Parent < Right
- In-order traversal = sorted output
- Balance matters for performance!

Happy coding! 🚀

---

**Last Updated**: 2025
**Author**: Data Structures Learning Series

---

```
@startuml Binary Search Tree Diagrams

title Binary Search Tree - Visual Guide

' Tree Structure Example
package "Tree Structure" {
  node "8\n(root)" as root
  node "3" as left
  node "10" as right
  node "1" as ll
  node "6" as lr
  node "14" as rr
  node "4" as lrl
  node "7" as lrr
  node "13" as rrl

  root --> left
  root --> right
  left --> ll
  left --> lr
  right --> rr
  lr --> lrl
  lr --> lrr
  rr --> rrl
}

' TreeNode Class
class TreeNode<T> {
  +data: T
  +left: TreeNode<T> | null
  +right: TreeNode<T> | null
  +constructor(data: T)
}

' BinarySearchTree Class
class BinarySearchTree<T> {
  -root: TreeNode<T> | null
  -_size: number
  +insertNode(data: T): void
  +remove(value: T): boolean
  +contains(value: T): boolean
  +min(): T | null
  +max(): T | null
  +size(): number
  +isEmpty(): boolean
  +clear(): void
  +inOrder(visitor): void
  +preOrder(visitor): void
  +postOrder(visitor): void
  +levelOrder(visitor): void
  +toString(): string
  +prettyPrint(): string
  +print(): void
}

' Queue Helper
class Queue<T> {
  -dataList: T[]
  +enqueue(data: T): void
  +dequeue(): T | undefined
  +peek(): T | undefined
  +hasData(): boolean
  +size(): number
}

BinarySearchTree --> TreeNode : contains
BinarySearchTree ..> Queue : uses for\nlevel-order

note right of TreeNode
  Basic building block
  Each node has:
  - Data value
  - Left child pointer
  - Right child pointer
end note

note right of BinarySearchTree
  Main operations:
  • Insert: O(log n) avg
  • Search: O(log n) avg
  • Delete: O(log n) avg
  • Traversals: O(n)

  BST Property:
  Left < Parent < Right
end note

note right of Queue
  Used for level-order
  (breadth-first) traversal
end note

@enduml
```
