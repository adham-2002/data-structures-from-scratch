import LinkedList from "./singleLinkedList";
function demonstrateLinkedList(): void {
  const list = new LinkedList<number>();

  console.log("=== Linked List Demonstration ===");
  console.log("Initial list:", list.toString());
  console.log("Is empty:", list.isEmpty());
  console.log("Size:", list.size());

  // Test insert operations
  list.insertAtHead(3);
  list.insertAtHead(2);
  list.insertAtHead(1);
  list.insertAtTail(4);
  list.insertAtPosition(5, 2);

  console.log("\nAfter inserts:", list.toString());
  console.log("Size:", list.size());

  // Test search operations
  console.log("\n=== Search Operations ===");
  console.log("Contains 2:", list.search(2));
  console.log("Contains 5:", list.search(5));
  console.log("Contains 10:", list.search(10));

  // Test get operations
  console.log("\n=== Get Operations ===");
  console.log("Element at position 0:", list.getAt(0));
  console.log("Element at position 2:", list.getAt(2));
  console.log("Element at position 10:", list.getAt(10));

  // Test delete operations
  console.log("\n=== Delete Operations ===");
  console.log("Delete 2:", list.delete(2));
  console.log("After deleting 2:", list.toString());

  console.log("Delete at head:", list.deleteAtHead());
  console.log("After deleting head:", list.toString());

  console.log("Delete at tail:", list.deleteAtTail());
  console.log("After deleting tail:", list.toString());

  // Test reverse
  console.log("\n=== Reverse Operation ===");
  list.reverse();
  console.log("After reverse:", list.toString());

  // Test clear
  console.log("\n=== Clear Operation ===");
  list.clear();
  console.log("After clear:", list.toString());
  console.log("Is empty:", list.isEmpty());
}

// Uncomment to run demonstration
demonstrateLinkedList();
