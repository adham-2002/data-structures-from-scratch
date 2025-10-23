import DoublyListNode from "./doubleyLinkedList";
// ===== Example usage (uncomment to run quick demo) =====
function demonstrateDoublyLinkedList(): void {
  const list = new DoublyListNode<number>();
  console.log("=== Doubly Linked List Demo ===");
  console.log("Initial:", list.toString(), "size=", list.size());

  // Inserts
  list.insertAtHead(2); // [2]
  list.insertAtHead(1); // [1,2]
  list.insertAtTail(3); // [1,2,3]
  list.insertAtTail(5); // [1,2,3,5]
  list.insertAtPosition(4, 3); // [1,2,3,4,5]

  console.log("After inserts:", list.toString());
  console.log("Reverse order:", list.toStringReverse());

  // Queries
  console.log("Contains 3:", list.search(3));
  console.log("getAt(0):", list.getAt(0));
  console.log("getAt(4):", list.getAt(4));

  // Deletes
  list.delete(2); // [1,3,4,5]
  console.log("After delete(2):", list.toString());

  list.deleteAtHead(); // [3,4,5]
  console.log("After deleteAtHead:", list.toString());

  list.deleteAtTail(); // [3,4]
  console.log("After deleteAtTail:", list.toString());

  list.deleteAtPosition(1); // [3]
  console.log("After deleteAtPosition(1):", list.toString());

  // Reverse in-place
  list.insertAtTail(6); // [3,6]
  list.insertAtTail(7); // [3,6,7]
  console.log("Before reverse:", list.toString());
  list.reverse();
  console.log("After reverse:", list.toString());

  // Iteration
  console.log("Iterate:", [...list]);

  // Clear
  list.clear();
  console.log("After clear:", list.toString(), "isEmpty:", list.isEmpty());
}

// Uncomment to run demonstration
demonstrateDoublyLinkedList();
