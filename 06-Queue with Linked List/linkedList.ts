/**
 * Node class for LinkedList
 * Each node contains data and a reference to the next node
 */
class LinkedListNode<T> {
  public next: LinkedListNode<T> | null = null;
  constructor(public data: T) {}
}

/**
 * LinkedList interface for Queue implementation
 * This linked list is optimized for queue operations (FIFO behavior)
 */
interface ILinkedList<T> {
  insertAtTail(data: T): void; // Add element at the end - O(1)
  deleteAtHead(): T | null; // Remove element from the beginning - O(1)
  getHead(): T | null; // Get the head element without removing - O(1)
  size(): number; // Get the number of elements - O(1)
  isEmpty(): boolean; // Check if list is empty - O(1)
  clear(): void; // Remove all elements - O(1)
  toArray(): T[]; // Convert list to array - O(n)
  print(): void; // Print list elements - O(n)
}
/**
 * LinkedList implementation for Queue
 * Uses tail for enqueue (O(1)) and head for dequeue (O(1))
 * This provides FIFO (First In First Out) behavior
 */
class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null = null; // Points to first node
  private tail: LinkedListNode<T> | null = null; // Points to last node
  private count: number = 0; // Tracks number of elements

  /**
   * Helper method to create a new node
   */
  createNode(data: T): LinkedListNode<T> {
    return new LinkedListNode<T>(data);
  }
  /**
   * Insert element at the tail (end) of the list
   * Time Complexity: O(1)
   * Visual: [head] -> [node2] -> [newNode] -> null
   * @param data - The data to insert
   */
  insertAtTail(data: T): void {
    const newNode = this.createNode(data);
    if (this.isEmpty()) {
      // List is empty, new node is both head and tail
      this.head = newNode;
      this.tail = newNode;
    } else {
      // List has elements, insert at the end
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.count++;
  }
  /**
   * Delete element from the head (beginning) of the list
   * Time Complexity: O(1)
   * Visual: [head] -> [node2] -> null  =>  [node2] -> null
   * @returns The deleted element's data, or null if list is empty
   */
  deleteAtHead(): T | null {
    if (this.isEmpty()) return null;

    const removedNode = this.head!;
    this.head = this.head!.next;
    this.count--;

    // If list becomes empty, update tail to null
    if (this.head === null) {
      this.tail = null;
    }

    return removedNode.data;
  }

  /**
   * Get the head element without removing it
   * Time Complexity: O(1)
   * @returns The head element's data, or null if list is empty
   */
  getHead(): T | null {
    return this.head ? this.head.data : null;
  }
  /**
   * Get the number of elements in the list
   * Time Complexity: O(1)
   */
  size(): number {
    return this.count;
  }

  /**
   * Check if the list is empty
   * Time Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Clear all elements from the list
   * Time Complexity: O(1)
   */
  clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }
  /**
   * Convert the linked list to an array
   * Time Complexity: O(n) where n is the number of elements
   * @returns Array containing all elements in order
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  /**
   * Print the list elements in a readable format
   * Visual output: element1 -> element2 -> element3
   */
  print(): void {
    const elements = this.toArray();
    console.log(elements.join(" -> "));
  }
}
export { LinkedList, LinkedListNode };
