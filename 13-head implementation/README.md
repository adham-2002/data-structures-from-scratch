# Heap Data Structure (TypeScript Implementation)

## 1. Problem Scratch

A **heap** is a specialized tree-based data structure that satisfies the heap property:

- In a **min-heap**, for any given node, the value is less than or equal to its children.
- In a **max-heap**, for any given node, the value is greater than or equal to its children.

Heaps are commonly used to implement priority queues and for efficient retrieval of the minimum or maximum element.

**Key Operations:**

- Insert: Add a new element while maintaining the heap property.
- Pop: Remove and return the root element (min or max), then re-heapify.
- Print/Draw: Visualize the heap.
- Size: Get the number of elements.

---

## 2. Class Diagram

```
+-------------------+
|     Heap<T>       |
+-------------------+
| - dataList: T[]   |
| - _size: number   |
+-------------------+
| + constructor()   |
| + insert(data:T)  |
| + pop(): T | null |
| + print(): void   |
| + draw(): void    |
| + size(): number  |
| - heapifyDown(i)  |
| - compare(a,b):#  |
+-------------------+
```

---

## 3. Pseudocode

```pseudo
class Heap<T>:
    dataList: array of T
    _size: integer

    constructor():
        dataList = []
        _size = 0

    insert(data):
        i = _size
        dataList[i] = data
        _size += 1
        while i != 0 and compare(dataList[i], dataList[parent(i)]) < 0:
            swap dataList[i] and dataList[parent(i)]
            i = parent(i)

    pop():
        if _size == 0: return null
        root = dataList[0]
        dataList[0] = dataList[_size-1]
        _size -= 1
        heapifyDown(0)
        return root

    heapifyDown(i):
        while left(i) < _size:
            smaller = left(i)
            if right(i) < _size and compare(dataList[right(i)], dataList[left(i)]) < 0:
                smaller = right(i)
            if compare(dataList[smaller], dataList[i]) >= 0:
                break
            swap dataList[i] and dataList[smaller]
            i = smaller

    print():
        print dataList[0:_size]

    draw():
        if _size == 0: print (empty)
        ... (prints tree level by level)

    size():
        return _size

    compare(a, b):
        if both numbers: return a - b
        else: error
```

---

## 4. Detailed Code Explanation

### Class Members

- `dataList: T[]` — Internal array to store heap elements.
- `_size: number` — Tracks the number of elements in the heap.

### Methods

- **constructor()**: Initializes an empty heap.
- **insert(data: T)**: Adds a new element to the end, then "bubbles up" to maintain the heap property by comparing with its parent and swapping if necessary.
- **pop()**: Removes and returns the root element (minimum for min-heap). The last element replaces the root, then `heapifyDown` restores the heap property.
- **heapifyDown(i: number)**: Moves the element at index `i` down the tree, swapping with the smaller child until the heap property is restored.
- **print()**: Prints the heap as a flat list.
- **draw()**: Visualizes the heap as a tree structure in the console, level by level. Prints `(empty)` if the heap is empty.
- **size()**: Returns the number of elements in the heap.
- **compare(a: T, b: T)**: Compares two elements. By default, only supports numbers (returns `a - b`). Throws an error for other types.

### Example Usage

```typescript
const heap = new Heap<number>();
heap.insert(5);
heap.insert(3);
heap.insert(8);
heap.insert(1);
heap.print(); // 1 - 3 - 8 - 5
heap.draw();
while (heap.size() > 0) {
  console.log("Popped:", heap.pop());
}
```

---

## 5. Notes

- This implementation is a min-heap for numbers by default. To support other types, extend the `compare` method.
- The code includes debugging logs for all operations.
