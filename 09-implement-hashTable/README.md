# Hash Table Implementation - Beginner Friendly Guide

## 📚 What is a Hash Table?

A **Hash Table** (also called a Hash Map or Dictionary) is like a super-fast phonebook. Instead of searching page by page, you can instantly find what you're looking for!

### Real-World Analogy:

Imagine a library with books organized by the first letter of the author's last name:

- Books by "Smith" go in the 'S' section
- Books by "Jones" go in the 'J' section
- You can find any book super fast!

A hash table works the same way, but with a mathematical function instead of alphabet letters.

## 🎯 Key Concepts for Beginners

### 1. **Hash Function**

Converts a key (like "name") into a number (array index):

```
"Alice" → hash function → 5 → store at index 5
```

### 2. **Collisions**

What if two keys hash to the same number?

```
"Alice" → 5
"Bob"   → 5  ← Collision!
```

Solution: Check the next slot (linear probing)

### 3. **Dynamic Resizing**

When the table gets full, double its size to keep it fast:

```
[A, B, C] → full → resize → [null, A, null, B, null, C]
```

## 📊 Time Complexity

| Operation | Average | Worst Case | Why?                                     |
| --------- | ------- | ---------- | ---------------------------------------- |
| Get       | O(1)    | O(n)       | Usually instant, slow if many collisions |
| Set       | O(1)    | O(n)       | Usually instant, slow when resizing      |
| Delete    | O(1)    | O(n)       | Usually instant, slow if many collisions |

## 💻 How to Use

### Basic Example:

```typescript
// Create a hash table
const table = new HashTable<string, string>();

// Add entries
table.set("name", "John");
table.set("email", "john@example.com");
table.set("age", "25");

// Get values
console.log(table.get("name")); // "John"
console.log(table.get("email")); // "john@example.com"

// Update a value
table.set("age", "26");
console.log(table.get("age")); // "26"

// Check size
console.log(table.size()); // 3
```

## 🔧 Implementation Details

### Classes:

1. **KeyValuePair<K, V>**

   - Stores one key-value pair
   - Example: `{key: "name", value: "John"}`

2. **HashTable<K, V>**
   - Main class with all the magic
   - Stores multiple key-value pairs
   - Automatically resizes when needed

### Important Methods:

#### Public Methods (You can use these):

- `set(key, value)` - Add or update a key-value pair
- `get(key)` - Retrieve a value by its key
- `size()` - Get number of stored pairs
- `print()` - Display the internal structure (for learning)

#### Private Methods (Internal only):

- `hash(key)` - Convert key to array index
- `findSlot(key, index, forSet)` - Handle collisions
- `insertPair(key, value)` - Actually store the pair
- `resizeIfNeeded()` - Grow the table when needed

## 🎓 Step-by-Step Example

Let's walk through what happens when you add items:

```typescript
const table = new HashTable<string, string>();

// Step 1: Add "Alice"
table.set("Alice", "alice@email.com");
// - Hash "Alice" → gets index 0
// - Slot 0 is empty
// - Store at index 0
// Result: [Alice, null, null]

// Step 2: Add "Bob"
table.set("Bob", "bob@email.com");
// - Hash "Bob" → gets index 1
// - Slot 1 is empty
// - Store at index 1
// Result: [Alice, Bob, null]

// Step 3: Add "Charlie"
table.set("Charlie", "charlie@email.com");
// - Hash "Charlie" → gets index 0 (collision!)
// - Slot 0 occupied by Alice
// - Try next slot: index 1 (occupied by Bob)
// - Try next slot: index 2 (empty!)
// - Store at index 2
// Result: [Alice, Bob, Charlie]

// Step 4: Add "Diana" (triggers resize)
table.set("Diana", "diana@email.com");
// - Table is full (3/3 slots used)
// - Resize: double to 6 slots
// - Rehash all existing entries
// - Add Diana
// Result: [Diana, null, Alice, Bob, null, Charlie]
```

## 🚀 Running the Code

```bash
# With ts-node
ts-node hashTable.ts

# Or compile first
tsc hashTable.ts
node hashTable.js
```

## 📖 What You'll Learn

### From This Implementation:

1. ✅ How hash functions convert keys to indices
2. ✅ How collisions are resolved (linear probing)
3. ✅ Why and when resizing happens
4. ✅ How rehashing works after resize
5. ✅ Time complexity trade-offs

### Watch for These in Output:

- `[collision]` - Shows collision resolution steps
- `[resize]` - Shows when table grows
- `[get]` - Shows retrieval operations

## 🔍 Common Questions

### Q: Why start with size 3?

**A:** Small size lets you see collisions and resizing quickly when learning. Real implementations start larger (like 16 or 32).

### Q: What's FNV-1a?

**A:** A fast hash algorithm that spreads keys evenly across indices. It's simple and works well for learning.

### Q: Why linear probing?

**A:** It's the simplest collision resolution method:

- If slot N is full, try N+1
- If N+1 is full, try N+2
- And so on...

### Q: When does it resize?

**A:** When the number of stored pairs equals the array size (100% full). Real implementations often resize at 70-75% full.

### Q: What happens to old data when resizing?

**A:** All entries are rehashed and moved to their new positions in the larger array.

## 🎯 Try These Exercises

1. **Add more entries** - Watch collisions and resizing happen
2. **Change INITIAL_SIZE to 10** - See fewer collisions
3. **Add duplicate keys** - See values get updated
4. **Look up non-existent keys** - See collision resolution search

## 📝 Key Takeaways

1. Hash tables are **fast** - O(1) average time
2. Hash functions convert keys to indices
3. Collisions are normal and handled automatically
4. Resizing keeps the table efficient
5. Perfect for quick lookups (like dictionaries, caches, databases)

## 🌟 Real-World Uses

Hash tables are everywhere:

- **Databases** - Index records for fast queries
- **Caches** - Store frequently accessed data
- **Compilers** - Symbol tables for variables
- **Routers** - IP address lookup tables
- **JavaScript Objects** - Under the hood implementation
- **Python Dictionaries** - Built-in hash table

## 📚 Further Reading

Once you understand this implementation, explore:

- Separate chaining (using linked lists for collisions)
- Open addressing variations (quadratic probing, double hashing)
- Perfect hash functions
- Cryptographic hash functions (SHA-256, MD5)

---

**Happy Learning! 🚀**

_Start with the demo code, experiment with different inputs, and watch what happens!_
