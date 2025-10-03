```mermaid
classDiagram
    %% =============================
    %% Classes
    %% =============================

    class DoublyListNode~T~ {
        +T data
        +DoublyListNode~T~ prev
        +DoublyListNode~T~ next
        +constructor(data: T)
    }

    class IDoublyLinkedList~T~ {
        <<interface>>
        +insertAtHead(data: T) void
        +insertAtTail(data: T) void
        +insertAtPosition(data: T, pos: number) bool
        +delete(data: T) bool
        +deleteAtHead() bool
        +deleteAtTail() bool
        +deleteAtPosition(pos: number) bool
        +search(data: T) bool
        +getAt(pos: number) T | null
        +size() number
        +isEmpty() bool
        +toArray() T[]
        +toArrayReverse() T[]
        +toString() string
        +toStringReverse() string
        +reverse() void
        +clear() void
        +getHead() T | null
        +getTail() T | null
        +[Symbol.iterator]() Iterator~T~
    }

    class DoublyLinkedList~T~ {
        -DoublyListNode~T~ head
        -DoublyListNode~T~ tail
        -number count
        +insertAtHead(data: T) void
        +insertAtTail(data: T) void
        +insertAtPosition(data: T, pos: number) bool
        +delete(data: T) bool
        +deleteAtHead() bool
        +deleteAtTail() bool
        +deleteAtPosition(pos: number) bool
        +search(data: T) bool
        +getAt(pos: number) T | null
        +size() number
        +isEmpty() bool
        +toArray() T[]
        +toArrayReverse() T[]
        +toString() string
        +toStringReverse() string
        +reverse() void
        +clear() void
        +getHead() T | null
        +getTail() T | null
        +[Symbol.iterator]() Iterator~T~
    }

    %% =============================
    %% Relationships
    %% =============================
    IDoublyLinkedList~T~ <|.. DoublyLinkedList~T~
    DoublyLinkedList~T~ o--> DoublyListNode~T~
    DoublyListNode~T~ <--> DoublyListNode~T~ : prev/next
```

---

### 🔑 Key Points

- `DoublyListNode<T>` has **`prev`** and **`next`** (bidirectional).
- `IDoublyLinkedList<T>` defines **all public operations**.
- `DoublyLinkedList<T>` **implements the interface** and manages:

  - `head`, `tail`, and `count`.
  - Provides **forward + reverse traversal**.

- Node relationships are **bidirectional** (`<-->` in Mermaid).

---

### 📊 Time Complexity Table

| Operation                | Complexity |
| ------------------------ | ---------- |
| Insert at head/tail      | O(1)       |
| Insert at position       | O(n)       |
| Delete at head/tail      | O(1)       |
| Delete at position       | O(n)       |
| Delete by value          | O(n)       |
| Search                   | O(n)       |
| Get at position          | O(n)       |
| Reverse (in-place)       | O(n)       |
| Size / isEmpty / Clear   | O(1)       |
| Traversal (toArray etc.) | O(n)       |

---
