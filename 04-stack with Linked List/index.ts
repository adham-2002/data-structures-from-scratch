import { StackWithLinkedList } from "./stack";

console.log("=== STACK WITH LINKED LIST - LEARNING EXAMPLES ===");
console.log();

// Example 1: Basic Push and Pop Operations
console.log("--- Example 1: Basic Operations ---");
const stack = new StackWithLinkedList<number>();

console.log("Is stack empty?", stack.isEmpty()); // true

stack.push(10);
console.log("Pushed: 10");
stack.push(20);
console.log("Pushed: 20");
stack.push(30);
console.log("Pushed: 30");

stack.print(); // Should show: 30 -> 20 -> 10
console.log("Stack size:", stack.size()); // 3
console.log();

// Example 2: Peek (view top without removing)
console.log("--- Example 2: Peek Operation ---");
console.log("Top element (peek):", stack.peek()); // 30
console.log("Size after peek:", stack.size()); // Still 3 (peek doesn't remove)
console.log();

// Example 3: Pop Operations
console.log("--- Example 3: Pop Operations ---");
const popped1 = stack.pop();
console.log("Popped:", popped1); // 30
stack.print(); // Should show: 20 -> 10

const popped2 = stack.pop();
console.log("Popped:", popped2); // 20
stack.print(); // Should show: 10

console.log("Current size:", stack.size()); // 1
console.log();

// Example 4: Edge Case - Pop until empty
console.log("--- Example 4: Pop Until Empty ---");
const popped3 = stack.pop();
console.log("Popped:", popped3); // 10
console.log("Is stack empty?", stack.isEmpty()); // true

const poppedEmpty = stack.pop();
console.log("Pop from empty stack:", poppedEmpty); // null
console.log();

// Example 5: Peek on empty stack
console.log("--- Example 5: Peek on Empty Stack ---");
console.log("Peek empty stack:", stack.peek()); // null
console.log();

// Example 6: Reuse stack after clear
console.log("--- Example 6: Push Again and Clear ---");
stack.push(100);
stack.push(200);
stack.push(300);
stack.print(); // 300 -> 200 -> 100
console.log("Size:", stack.size()); // 3

stack.clear();
console.log("After clear, is empty?", stack.isEmpty()); // true
console.log("Size after clear:", stack.size()); // 0
console.log();

// Example 7: Using with different data types
console.log("--- Example 7: Stack with Strings ---");
const stringStack = new StackWithLinkedList<string>();
stringStack.push("First");
stringStack.push("Second");
stringStack.push("Third");
stringStack.print(); // Third -> Second -> First

console.log("Top string:", stringStack.peek()); // Third
console.log("Popped string:", stringStack.pop()); // Third
stringStack.print(); // Second -> First
console.log();

// Example 8: toArray method
console.log("--- Example 8: Convert to Array ---");
const numStack = new StackWithLinkedList<number>();
numStack.push(5);
numStack.push(15);
numStack.push(25);
console.log("Stack as array:", numStack.toArray()); // [25, 15, 5]
console.log();

console.log("=== ALL EXAMPLES COMPLETED ===");
