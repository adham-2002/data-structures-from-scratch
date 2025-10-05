import { QueueWithLinkedList } from "./queue";

console.log("=== QUEUE WITH LINKED LIST - LEARNING EXAMPLES ===");
console.log();

// Example 1: Basic Enqueue and Dequeue Operations
console.log("--- Example 1: Basic Operations ---");
const queue = new QueueWithLinkedList<number>();

console.log("Is queue empty?", queue.isEmpty()); // true

queue.enqueue(10);
console.log("Enqueued: 10");
queue.enqueue(20);
console.log("Enqueued: 20");
queue.enqueue(30);
console.log("Enqueued: 30");

queue.print(); // Should show: 10 -> 20 -> 30 (FIFO order)
console.log("Queue size:", queue.size()); // 3
console.log();

// Example 2: Peek (view front without removing)
console.log("--- Example 2: Peek Operation ---");
console.log("Front element (peek):", queue.peek()); // 10
console.log("Size after peek:", queue.size()); // Still 3 (peek doesn't remove)
console.log();

// Example 3: Dequeue Operations
console.log("--- Example 3: Dequeue Operations ---");
const dequeued1 = queue.dequeue();
console.log("Dequeued:", dequeued1); // 10
queue.print(); // Should show: 20 -> 30

const dequeued2 = queue.dequeue();
console.log("Dequeued:", dequeued2); // 20
queue.print(); // Should show: 30

console.log("Current size:", queue.size()); // 1
console.log();

// Example 4: Edge Case - Dequeue until empty
console.log("--- Example 4: Dequeue Until Empty ---");
const dequeued3 = queue.dequeue();
console.log("Dequeued:", dequeued3); // 30
console.log("Is queue empty?", queue.isEmpty()); // true

const dequeuedEmpty = queue.dequeue();
console.log("Dequeue from empty queue:", dequeuedEmpty); // null
console.log();

// Example 5: Peek on empty queue
console.log("--- Example 5: Peek on Empty Queue ---");
console.log("Peek empty queue:", queue.peek()); // null
console.log();

// Example 6: Reuse queue after clear
console.log("--- Example 6: Enqueue Again and Clear ---");
queue.enqueue(100);
queue.enqueue(200);
queue.enqueue(300);
queue.print(); // 100 -> 200 -> 300
console.log("Size:", queue.size()); // 3

queue.clear();
console.log("After clear, is empty?", queue.isEmpty()); // true
console.log("Size after clear:", queue.size()); // 0
console.log();

// Example 7: Using with different data types
console.log("--- Example 7: Queue with Strings ---");
const stringQueue = new QueueWithLinkedList<string>();
stringQueue.enqueue("First");
stringQueue.enqueue("Second");
stringQueue.enqueue("Third");
stringQueue.print(); // First -> Second -> Third

console.log("Front string:", stringQueue.peek()); // First
console.log("Dequeued string:", stringQueue.dequeue()); // First
stringQueue.print(); // Second -> Third
console.log();

// Example 8: toArray method
console.log("--- Example 8: Convert to Array ---");
const numQueue = new QueueWithLinkedList<number>();
numQueue.enqueue(5);
numQueue.enqueue(15);
numQueue.enqueue(25);
console.log("Queue as array:", numQueue.toArray()); // [5, 15, 25]
console.log();

// Example 9: FIFO Behavior Demo
console.log("--- Example 9: FIFO Behavior ---");
const fifoQueue = new QueueWithLinkedList<string>();
fifoQueue.enqueue("Task 1");
fifoQueue.enqueue("Task 2");
fifoQueue.enqueue("Task 3");
console.log("Processing tasks in order:");
while (!fifoQueue.isEmpty()) {
  console.log("Processing:", fifoQueue.dequeue());
}
console.log();

console.log("=== ALL EXAMPLES COMPLETED ===");
