# Queue with Linked List Implementation

## 📚 Overview

This is a **Queue** data structure implementation using a **Singly Linked List** in TypeScript. A Queue follows the **FIFO (First In, First Out)** principle, similar to people standing in line - the first person to join the line is the first person to be served.

## 🎯 What is a Queue?

A Queue is a linear data structure that follows a particular order for operations:

- **Enqueue**: Add an element to the rear (tail) of the queue
- **Dequeue**: Remove an element from the front (head) of the queue
- **Peek**: View the front element without removing it

### Real-World Examples:

- 🎫 People waiting in line at a ticket counter
- 🖨️ Print job queue in a printer
- 📞 Call center waiting queue
- 🎮 Game matchmaking queue
- 🍔 Fast food order processing

## 🏗️ Architecture

### Files Structure:

```
06-Queue with Linked List/
├── linkedList.ts    # Linked list implementation (FIFO optimized)
├── queue.ts         # Queue wrapper class
├── index.ts         # Examples and demonstrations
├── README.md        # This file
└── queue-diagram.wsd # UML class diagram
```

## 🔧 Implementation Details

### How It Works:

```
ENQUEUE (Add to rear):
Step 1: enqueue(10)
[10] <- head & tail

Step 2: enqueue(20)
[10] -> [20] <- tail
 ↑
head

Step 3: enqueue(30)
[10] -> [20] -> [30] <- tail
 ↑
head

DEQUEUE (Remove from front):
Step 4: dequeue() returns 10
[20] -> [30] <- tail
 ↑
head

Step 5: dequeue() returns 20
[30] <- head & tail
```

### Key Operations:

| Operation       | Description               | Time Complexity | Space Complexity |
| --------------- | ------------------------- | --------------- | ---------------- |
| `enqueue(item)` | Add element to rear       | O(1)            | O(1)             |
| `dequeue()`     | Remove element from front | O(1)            | O(1)             |
| `peek()`        | View front element        | O(1)            | O(1)             |
| `isEmpty()`     | Check if queue is empty   | O(1)            | O(1)             |
| `size()`        | Get number of elements    | O(1)            | O(1)             |
| `clear()`       | Remove all elements       | O(1)            | O(1)             |
| `toArray()`     | Convert to array          | O(n)            | O(n)             |
| `print()`       | Print elements            | O(n)            | O(1)             |

## 💻 Usage Examples

### Basic Operations:

```typescript
import { QueueWithLinkedList } from "./queue";

// Create a new queue
const queue = new QueueWithLinkedList<number>();

// Enqueue elements
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

queue.print(); // Output: 10 -> 20 -> 30

// Dequeue elements (FIFO order)
console.log(queue.dequeue()); // 10
console.log(queue.dequeue()); // 20
console.log(queue.dequeue()); // 30
```

### Peek Operation:

```typescript
const queue = new QueueWithLinkedList<string>();
queue.enqueue("First");
queue.enqueue("Second");

console.log(queue.peek()); // "First" (doesn't remove)
console.log(queue.size()); // 2 (still has both elements)
```

### Check if Empty:

```typescript
const queue = new QueueWithLinkedList<number>();
console.log(queue.isEmpty()); // true

queue.enqueue(100);
console.log(queue.isEmpty()); // false
```

### Convert to Array:

```typescript
const queue = new QueueWithLinkedList<number>();
queue.enqueue(5);
queue.enqueue(15);
queue.enqueue(25);

console.log(queue.toArray()); // [5, 15, 25]
```

### Process Tasks in Order:

```typescript
const taskQueue = new QueueWithLinkedList<string>();
taskQueue.enqueue("Task 1");
taskQueue.enqueue("Task 2");
taskQueue.enqueue("Task 3");

while (!taskQueue.isEmpty()) {
  console.log("Processing:", taskQueue.dequeue());
}
// Output:
// Processing: Task 1
// Processing: Task 2
// Processing: Task 3
```

## 🎓 Key Concepts

### FIFO Behavior:

The Queue ensures **First In, First Out** ordering:

- **Insert at Tail** (`insertAtTail`): New elements join at the back of the line
- **Delete at Head** (`deleteAtHead`): Elements leave from the front of the line

### Why Use Linked List for Queue?

1. ✅ **O(1) Enqueue**: Direct access to tail pointer
2. ✅ **O(1) Dequeue**: Direct access to head pointer
3. ✅ **Dynamic Size**: No fixed capacity limit
4. ✅ **Memory Efficient**: Only allocates what's needed

### Comparison with Array-based Queue:

| Feature        | Linked List Queue | Array Queue                       |
| -------------- | ----------------- | --------------------------------- |
| Enqueue        | O(1)              | O(1) or O(n) if resize            |
| Dequeue        | O(1)              | O(n) if shift, O(1) with circular |
| Memory         | Dynamic           | Fixed or resizing overhead        |
| Cache locality | Poor              | Excellent                         |

## 🚀 Running the Examples

```bash
# Install dependencies (if needed)
npm install

# Run the queue examples
npm run start:queuestack
```

Or with ts-node directly:

```bash
ts-node "06-Queue with Linked List/index.ts"
```

## 📊 Class Diagram

```
┌─────────────────────────┐
│   LinkedListNode<T>     │
├─────────────────────────┤
│ + data: T               │
│ + next: LinkedListNode  │
│   | null                │
└─────────────────────────┘
           ▲
           │ uses
           │
┌─────────────────────────────────────┐
│      ILinkedList<T>                 │
│      <<interface>>                  │
├─────────────────────────────────────┤
│ + insertAtTail(data: T): void       │
│ + deleteAtHead(): T | null          │
│ + getHead(): T | null               │
│ + size(): number                    │
│ + isEmpty(): boolean                │
│ + clear(): void                     │
│ + toArray(): T[]                    │
│ + print(): void                     │
└─────────────────────────────────────┘
           ▲
           │ implements
           │
┌─────────────────────────────────────┐
│      LinkedList<T>                  │
├─────────────────────────────────────┤
│ - head: LinkedListNode | null       │
│ - tail: LinkedListNode | null       │
│ - count: number                     │
├─────────────────────────────────────┤
│ + insertAtTail(data: T): void       │
│ + deleteAtHead(): T | null          │
│ + getHead(): T | null               │
│ + size(): number                    │
│ + isEmpty(): boolean                │
│ + clear(): void                     │
│ + toArray(): T[]                    │
│ + print(): void                     │
│ - createNode(data: T): Node         │
└─────────────────────────────────────┘
           ▲
           │ has-a
           │
┌─────────────────────────────────────┐
│   QueueWithLinkedList<T>            │
├─────────────────────────────────────┤
│ - list: LinkedList<T>               │
├─────────────────────────────────────┤
│ + constructor()                     │
│ + enqueue(item: T): void            │
│ + dequeue(): T | null               │
│ + peek(): T | null                  │
│ + isEmpty(): boolean                │
│ + size(): number                    │
│ + clear(): void                     │
│ + toArray(): T[]                    │
│ + print(): void                     │
└─────────────────────────────────────┘
```

### Class Relationships:

- **LinkedListNode**: Basic node structure containing data and pointer to next node
- **ILinkedList**: Interface defining linked list operations optimized for Queue
- **LinkedList**: Implements ILinkedList with head/tail pointers for O(1) operations
- **QueueWithLinkedList**: Wraps LinkedList to provide Queue-specific API (enqueue/dequeue)

## 🧪 Testing Scenarios

The `index.ts` file includes comprehensive examples:

1. ✅ Basic enqueue and dequeue operations
2. ✅ Peek operation (view without removing)
3. ✅ Edge case: dequeue from empty queue
4. ✅ Edge case: peek on empty queue
5. ✅ Clear and reuse queue
6. ✅ Generic types (strings, numbers, objects)
7. ✅ Convert to array
8. ✅ FIFO behavior demonstration

## 🎯 Common Use Cases

### 1. Task Scheduler

```typescript
const taskQueue = new QueueWithLinkedList<Task>();
taskQueue.enqueue(task1);
taskQueue.enqueue(task2);

while (!taskQueue.isEmpty()) {
  const task = taskQueue.dequeue();
  executeTask(task);
}
```

### 2. Breadth-First Search (BFS)

```typescript
const queue = new QueueWithLinkedList<Node>();
queue.enqueue(startNode);

while (!queue.isEmpty()) {
  const node = queue.dequeue();
  for (const neighbor of node.neighbors) {
    queue.enqueue(neighbor);
  }
}
```

### 3. Message Queue

```typescript
const messageQueue = new QueueWithLinkedList<Message>();
messageQueue.enqueue(message1);
messageQueue.enqueue(message2);

const nextMessage = messageQueue.dequeue();
processMessage(nextMessage);
```

## 🔍 Implementation Highlights

### LinkedList Class:

- Maintains `head` and `tail` pointers for O(1) operations
- `insertAtTail()`: Adds to the end (enqueue)
- `deleteAtHead()`: Removes from the front (dequeue)
- `getHead()`: Peeks at the front element

### Queue Class:

- Wraps LinkedList with queue-specific API
- Provides clean, intuitive method names
- Handles edge cases (empty queue)
- Type-safe with TypeScript generics

## 📝 Notes

- The queue has **no maximum capacity** (limited only by available memory)
- All basic operations are **O(1)** time complexity
- The implementation is **generic** and works with any data type
- Edge cases like empty queue operations are handled gracefully

## 🎓 Learning Resources

To understand queues better:

1. Study the visual diagrams in this README
2. Run the examples in `index.ts`
3. Experiment with different data types
4. Compare with stack (LIFO) behavior

## 🤝 Related Data Structures

- **Stack**: LIFO (Last In, First Out) - opposite of Queue
- **Deque**: Double-ended queue - can enqueue/dequeue from both ends
- **Priority Queue**: Elements have priorities, not FIFO
- **Circular Queue**: Wraps around when reaching the end

---

**Happy Coding! 🚀**
