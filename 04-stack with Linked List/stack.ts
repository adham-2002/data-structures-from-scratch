import { LinkedList } from "./linkedList";

/**
 * Stack implementation using Linked List
 *
 * STACK CONCEPT:
 * - LIFO (Last-In-First-Out) data structure
 * - Think of it like a stack of plates: you add/remove from the top
 * - Only the top element is accessible
 *
 * WHY USE LINKED LIST?
 * - Dynamic size (no fixed capacity like arrays)
 * - O(1) push and pop operations
 * - No need to resize like dynamic arrays
 *
 * OPERATIONS:
 * - push(): Add element to top - O(1)
 * - pop(): Remove element from top - O(1)
 * - peek(): View top element without removing - O(1)
 * - isEmpty(): Check if stack is empty - O(1)
 * - size(): Get number of elements - O(1)
 */
export class StackWithLinkedList<T> {
  private list: LinkedList<T>;

  constructor() {
    this.list = new LinkedList<T>();
  }

  /**
   * Push (add) an element to the top of the stack
   * Time Complexity: O(1)
   * Visual:
   *   Before: [20] -> [10]
   *   After:  [30] -> [20] -> [10]
   * @param data - The element to push
   */
  push(data: T): void {
    this.list.insertAtHead(data);
  }

  /**
   * Pop (remove) and return the top element from the stack
   * Time Complexity: O(1)
   * Visual:
   *   Before: [30] -> [20] -> [10]
   *   After:  [20] -> [10]
   * @returns The popped element, or null if stack is empty
   */
  pop(): T | null {
    return this.list.deleteAtHead();
  }

  /**
   * Peek at the top element without removing it
   * Time Complexity: O(1) - directly accesses head
   * @returns The top element, or null if stack is empty
   */
  peek(): T | null {
    return this.list.getHead();
  }

  /**
   * Get the number of elements in the stack
   * Time Complexity: O(1)
   */
  size(): number {
    return this.list.size();
  }

  /**
   * Check if the stack is empty
   * Time Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Clear all elements from the stack
   * Time Complexity: O(1)
   */
  clear(): void {
    this.list.clear();
  }

  /**
   * Convert stack to array (top to bottom)
   * Time Complexity: O(n)
   */
  toArray(): T[] {
    return this.list.toArray();
  }

  /**
   * Print the stack elements
   * Visual output: top -> ... -> bottom
   */
  print(): void {
    console.log("Stack (top -> bottom):");
    this.list.print();
  }
}
