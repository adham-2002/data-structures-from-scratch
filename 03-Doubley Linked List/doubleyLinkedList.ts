/**
 * Doubly Linked List implementation in TypeScript
 *
 * Features:
 * - O(1) insert/delete at head and tail
 * - O(n) insert/delete at arbitrary position
 * - Forward and reverse traversal
 * - Search, getAt, size, isEmpty, clear, reverse (in-place)
 * - Iteration support via for...of
 */

/** Node representing a single element in the Doubly Linked List */
class DoublyListNode<T> {
  public prev: DoublyListNode<T> | null = null;
  public next: DoublyListNode<T> | null = null;

  constructor(public readonly data: T) {}
}

/** Public interface for DoublyLinkedList operations */
interface IDoublyLinkedList<T> {
  insertAtHead(data: T): void; // O(1)
  insertAtTail(data: T): void; // O(1)
  insertAtPosition(data: T, position: number): boolean; // O(n)

  delete(data: T): boolean; // O(n) - deletes first occurrence
  deleteAtHead(): boolean; // O(1)
  deleteAtTail(): boolean; // O(1)
  deleteAtPosition(position: number): boolean; // O(n)

  search(data: T): boolean; // O(n)
  getAt(position: number): T | null; // O(n)

  size(): number;
  isEmpty(): boolean;

  toArray(): T[]; // Forward order
  toArrayReverse(): T[]; // Reverse order
  toString(): string;
  toStringReverse(): string;

  reverse(): void; // O(n) in-place
  clear(): void; // O(1)

  getHead(): T | null;
  getTail(): T | null;

  [Symbol.iterator](): Iterator<T>;
}

/** Doubly Linked List implementation */
export default class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
  private head: DoublyListNode<T> | null = null;
  private tail: DoublyListNode<T> | null = null;
  private count = 0;

  // ========== Helpers ==========
  private createNode(data: T): DoublyListNode<T> {
    return new DoublyListNode(data);
  }

  private isValidPosition(position: number): boolean {
    return position >= 0 && position < this.count;
  }

  private isValidInsertionPosition(position: number): boolean {
    return position >= 0 && position <= this.count;
  }

  private getNodeAt(position: number): DoublyListNode<T> | null {
    if (!this.isValidPosition(position)) return null;

    // Bidirectional traversal optimization
    if (position <= this.count / 2) {
      // Traverse from head
      let current = this.head;
      for (let i = 0; i < position; i++) current = current!.next;
      return current;
    } else {
      // Traverse from tail
      let current = this.tail;
      for (let i = this.count - 1; i > position; i--) current = current!.prev;
      return current;
    }
  }

  private linkBetween(
    prevNode: DoublyListNode<T> | null,
    newNode: DoublyListNode<T>,
    nextNode: DoublyListNode<T> | null
  ): void {
    console.log("[linkBetween] Called with:", {
      prevNode: prevNode ? prevNode.data : null,
      newNode: newNode.data,
      nextNode: nextNode ? nextNode.data : null,
    });
    newNode.prev = prevNode;
    newNode.next = nextNode;
    if (prevNode) {
      prevNode.next = newNode;
      console.log(
        `[linkBetween] Linked prevNode (${prevNode.data}) -> newNode (${newNode.data})`
      );
    } else {
      this.head = newNode;
      console.log(`[linkBetween] New head set to newNode (${newNode.data})`);
    }
    if (nextNode) {
      nextNode.prev = newNode;
      console.log(
        `[linkBetween] Linked newNode (${newNode.data}) -> nextNode (${nextNode.data})`
      );
    } else {
      this.tail = newNode;
      console.log(`[linkBetween] New tail set to newNode (${newNode.data})`);
    }
    console.log(
      `[linkBetween] Head: ${this.head ? this.head.data : null}, Tail: ${
        this.tail ? this.tail.data : null
      }`
    );
  }

  private unlinkNode(node: DoublyListNode<T>): void {
    const { prev, next } = node;
    if (prev) prev.next = next;
    else this.head = next;
    if (next) next.prev = prev;
    else this.tail = prev;
    node.prev = null;
    node.next = null;
  }

  // ========== Insert ==========
  public insertAtHead(data: T): void {
    const newNode = this.createNode(data);
    this.linkBetween(null, newNode, this.head);
    this.count++;
  }

  public insertAtTail(data: T): void {
    const newNode = this.createNode(data);
    this.linkBetween(this.tail, newNode, null);
    this.count++;
  }

  public insertAtPosition(data: T, position: number): boolean {
    if (!this.isValidInsertionPosition(position)) return false;

    if (position === 0) {
      this.insertAtHead(data);
      return true;
    }
    if (position === this.count) {
      this.insertAtTail(data);
      return true;
    }

    const nextNode = this.getNodeAt(position);
    if (!nextNode) return false; // should not happen due to validation
    const prevNode = nextNode.prev;
    const newNode = this.createNode(data);
    this.linkBetween(prevNode, newNode, nextNode);
    this.count++;
    return true;
  }

  // ========== Delete ==========
  public delete(data: T): boolean {
    if (this.isEmpty()) return false;

    // Search from head
    let current = this.head;
    while (current) {
      if (current.data === data) {
        this.unlinkNode(current);
        this.count--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  public deleteAtHead(): boolean {
    if (this.isEmpty()) return false;
    this.unlinkNode(this.head!);
    this.count--;
    return true;
  }

  public deleteAtTail(): boolean {
    if (this.isEmpty()) return false;
    this.unlinkNode(this.tail!);
    this.count--;
    return true;
  }

  public deleteAtPosition(position: number): boolean {
    if (!this.isValidPosition(position)) return false;

    if (position === 0) return this.deleteAtHead();
    if (position === this.count - 1) return this.deleteAtTail();

    const node = this.getNodeAt(position);
    if (!node) return false;
    this.unlinkNode(node);
    this.count--;
    return true;
  }

  // ========== Query ==========
  public search(data: T): boolean {
    for (let node = this.head; node; node = node.next) {
      if (node.data === data) return true;
    }
    return false;
  }

  public getAt(position: number): T | null {
    const node = this.getNodeAt(position);
    return node ? node.data : null;
  }

  public size(): number {
    return this.count;
  }

  public isEmpty(): boolean {
    return this.count === 0;
  }

  // ========== Traversal/Conversion ==========
  public toArray(): T[] {
    const out: T[] = [];
    for (let node = this.head; node; node = node.next) out.push(node.data);
    return out;
  }

  public toArrayReverse(): T[] {
    const out: T[] = [];
    for (let node = this.tail; node; node = node.prev) out.push(node.data);
    return out;
  }

  public toString(): string {
    return `[${this.toArray().join(" <-> ")}]`;
  }

  public toStringReverse(): string {
    return `[${this.toArrayReverse().join(" <-> ")}]`;
  }

  // ========== Mutations ==========
  public reverse(): void {
    // Swap next/prev for each node, then swap head/tail
    let current = this.head;
    while (current) {
      const nextTemp = current.next;
      current.next = current.prev;
      current.prev = nextTemp;
      current = nextTemp;
    }
    const oldHead = this.head;
    this.head = this.tail;
    this.tail = oldHead;
  }

  public clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  public getHead(): T | null {
    return this.head ? this.head.data : null;
  }

  public getTail(): T | null {
    return this.tail ? this.tail.data : null;
  }

  // ========== Iteration ==========
  public [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next: (): IteratorResult<T> => {
        if (current) {
          const value = current.data;
          current = current.next;
          return { value, done: false };
        }
        return { value: undefined as unknown as T, done: true };
      },
    };
  }
}
