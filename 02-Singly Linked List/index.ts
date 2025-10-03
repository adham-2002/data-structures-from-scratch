// /**
//  * Node class representing a single element in the Linked List
//  */
// class ListNode<T> {
//   public next: ListNode<T> | null = null;

//   constructor(public readonly data: T) {}
// }

// /**
//  * Interface defining the LinkedList operations
//  */
// interface ILinkedList<T> {
//   insertAtHead(data: T): void;
//   insertAtTail(data: T): void;
//   insertAtPosition(data: T, position: number): boolean;
//   delete(data: T): boolean;
//   deleteAtHead(): boolean;
//   deleteAtTail(): boolean;
//   search(data: T): boolean;
//   getAt(position: number): T | null;
//   size(): number;
//   isEmpty(): boolean;
//   toArray(): T[];
//   reverse(): void;
//   clear(): void;
// }

// /**
//  * Singly Linked List implementation
//  */
// class LinkedList<T> implements ILinkedList<T> {
//   private head: ListNode<T> | null = null;
//   private count: number = 0;

//   /**
//    * Creates a new node with the given data
//    */
//   private createNode(data: T): ListNode<T> {
//     return new ListNode(data);
//   }

//   /**
//    * Validates if the position is within bounds
//    */
//   private isValidPosition(position: number): boolean {
//     return position >= 0 && position < this.count;
//   }

//   /**
//    * Gets the node at a specific position
//    */
//   private getNodeAt(position: number): ListNode<T> | null {
//     if (!this.isValidPosition(position)) {
//       return null;
//     }

//     let current = this.head;
//     for (let i = 0; i < position && current !== null; i++) {
//       current = current.next;
//     }
//     return current;
//   }

//   /**
//    * Inserts an element at the beginning of the list
//    * Time Complexity: O(1)
//    */
//   public insertAtHead(data: T): void {
//     const newNode = this.createNode(data);
//     newNode.next = this.head;
//     this.head = newNode;
//     this.count++;
//   }

//   /**
//    * Inserts an element at the end of the list
//    * Time Complexity: O(n)
//    */
//   public insertAtTail(data: T): void {
//     const newNode = this.createNode(data);

//     if (this.isEmpty()) {
//       this.head = newNode;
//     } else {
//       let current = this.head;
//       // Use while loop with explicit null check
//       while (current !== null && current.next !== null) {
//         current = current.next;
//       }
//       // At this point, current is either the last node or null
//       if (current !== null) {
//         current.next = newNode;
//       }
//     }

//     this.count++;
//   }

//   /**
//    * Inserts an element at a specific position
//    * Returns true if insertion was successful, false otherwise
//    * Time Complexity: O(n)
//    */
//   public insertAtPosition(data: T, position: number): boolean {
//     if (position < 0 || position > this.count) {
//       return false;
//     }

//     if (position === 0) {
//       this.insertAtHead(data);
//       return true;
//     }

//     if (position === this.count) {
//       this.insertAtTail(data);
//       return true;
//     }

//     const newNode = this.createNode(data);
//     const previousNode = this.getNodeAt(position - 1);

//     if (previousNode === null) {
//       return false;
//     }

//     newNode.next = previousNode.next;
//     previousNode.next = newNode;
//     this.count++;
//     return true;
//   }

//   /**
//    * Deletes the first occurrence of the specified data
//    * Returns true if deletion was successful, false otherwise
//    * Time Complexity: O(n)
//    */
//   public delete(data: T): boolean {
//     if (this.isEmpty()) return false;

//     // Handle head deletion
//     if (this.head !== null && this.head.data === data) {
//       this.head = this.head.next;
//       this.count--;
//       return true;
//     }

//     let current = this.head;

//     // Iterate through the list
//     while (current !== null && current.next !== null) {
//       if (current.next.data === data) {
//         current.next = current.next.next;
//         this.count--;
//         return true;
//       }
//       current = current.next;
//     }

//     return false;
//   }

//   /**
//    * Deletes the head node
//    * Returns true if deletion was successful, false otherwise
//    * Time Complexity: O(1)
//    */
//   public deleteAtHead(): boolean {
//     if (this.isEmpty()) return false;

//     this.head = this.head!.next;
//     this.count--;
//     return true;
//   }

//   /**
//    * Deletes the tail node
//    * Returns true if deletion was successful, false otherwise
//    * Time Complexity: O(n)
//    */
//   public deleteAtTail(): boolean {
//     if (this.isEmpty()) return false;

//     if (this.count === 1) {
//       this.head = null;
//     } else {
//       let current = this.head;
//       // Find the second-to-last node
//       for (let i = 0; i < this.count - 2 && current !== null; i++) {
//         current = current.next;
//       }

//       if (current !== null) {
//         current.next = null;
//       }
//     }

//     this.count--;
//     return true;
//   }

//   /**
//    * Checks if the list contains the specified data
//    * Time Complexity: O(n)
//    */
//   public search(data: T): boolean {
//     let current = this.head;

//     while (current !== null) {
//       if (current.data === data) {
//         return true;
//       }
//       current = current.next;
//     }

//     return false;
//   }

//   /**
//    * Gets the data at a specific position
//    * Returns null if position is invalid
//    * Time Complexity: O(n)
//    */
//   public getAt(position: number): T | null {
//     const node = this.getNodeAt(position);
//     return node ? node.data : null;
//   }

//   /**
//    * Returns the number of elements in the list
//    */
//   public size(): number {
//     return this.count;
//   }

//   /**
//    * Checks if the list is empty
//    */
//   public isEmpty(): boolean {
//     return this.count === 0;
//   }

//   /**
//    * Converts the list to an array
//    */
//   public toArray(): T[] {
//     const result: T[] = [];
//     let current = this.head;

//     while (current !== null) {
//       result.push(current.data);
//       current = current.next;
//     }

//     return result;
//   }

//   /**
//    * Reverses the linked list in place
//    * Time Complexity: O(n)
//    */
//   public reverse(): void {
//     let prev: ListNode<T> | null = null;
//     let current = this.head;
//     let next: ListNode<T> | null = null;

//     while (current !== null) {
//       next = current.next;
//       current.next = prev;
//       prev = current;
//       current = next;
//     }

//     this.head = prev;
//   }

//   /**
//    * Clears the entire list
//    */
//   public clear(): void {
//     this.head = null;
//     this.count = 0;
//   }

//   /**
//    * Creates a string representation of the list
//    */
//   public toString(): string {
//     return `[${this.toArray().join(" -> ")}]`;
//   }
// }

// // Example usage with comprehensive testing
// function demonstrateLinkedList(): void {
//   const list = new LinkedList<number>();

//   console.log("=== Linked List Demonstration ===");
//   console.log("Initial list:", list.toString());
//   console.log("Is empty:", list.isEmpty());
//   console.log("Size:", list.size());

//   // Test insert operations
//   list.insertAtHead(3);
//   list.insertAtHead(2);
//   list.insertAtHead(1);
//   list.insertAtTail(4);
//   list.insertAtPosition(5, 2);

//   console.log("\nAfter inserts:", list.toString());
//   console.log("Size:", list.size());

//   // Test search operations
//   console.log("\n=== Search Operations ===");
//   console.log("Contains 2:", list.search(2));
//   console.log("Contains 5:", list.search(5));
//   console.log("Contains 10:", list.search(10));

//   // Test get operations
//   console.log("\n=== Get Operations ===");
//   console.log("Element at position 0:", list.getAt(0));
//   console.log("Element at position 2:", list.getAt(2));
//   console.log("Element at position 10:", list.getAt(10));

//   // Test delete operations
//   console.log("\n=== Delete Operations ===");
//   console.log("Delete 2:", list.delete(2));
//   console.log("After deleting 2:", list.toString());

//   console.log("Delete at head:", list.deleteAtHead());
//   console.log("After deleting head:", list.toString());

//   console.log("Delete at tail:", list.deleteAtTail());
//   console.log("After deleting tail:", list.toString());

//   // Test reverse
//   console.log("\n=== Reverse Operation ===");
//   list.reverse();
//   console.log("After reverse:", list.toString());

//   // Test clear
//   console.log("\n=== Clear Operation ===");
//   list.clear();
//   console.log("After clear:", list.toString());
//   console.log("Is empty:", list.isEmpty());
// }

// // Uncomment to run demonstration
// demonstrateLinkedList();
