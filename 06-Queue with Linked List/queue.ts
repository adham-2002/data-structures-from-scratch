import { LinkedList } from "./linkedList";

/**
 * Queue implementation using LinkedList
 * FIFO (First In First Out) data structure
 */
export class QueueWithLinkedList<T> {
  private list: LinkedList<T>;

  constructor() {
    this.list = new LinkedList<T>();
  }

  /**
   * Add element to the rear of the queue
   * Time Complexity: O(1)
   */
  enqueue(item: T): void {
    this.list.insertAtTail(item);
  }

  /**
   * Remove and return element from the front of the queue
   * Time Complexity: O(1)
   */
  dequeue(): T | null {
    if (this.isEmpty()) {
      console.log("Queue is empty");
      return null;
    }
    return this.list.deleteAtHead();
  }

  /**
   * View the front element without removing it
   * Time Complexity: O(1)
   */
  peek(): T | null {
    return this.list.getHead();
  }

  /**
   * Check if queue is empty
   * Time Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Get the number of elements in the queue
   * Time Complexity: O(1)
   */
  size(): number {
    return this.list.size();
  }

  /**
   * Clear all elements from the queue
   * Time Complexity: O(1)
   */
  clear(): void {
    this.list.clear();
  }

  /**
   * Convert queue to array (front to rear)
   * Time Complexity: O(n)
   */
  toArray(): T[] {
    return this.list.toArray();
  }

  /**
   * Print queue elements
   */
  print(): void {
    this.list.print();
  }
}
