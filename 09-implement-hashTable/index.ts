/**
 * Hash Table Implementation in TypeScript
 *
 * A Hash Table (also called Hash Map) is a data structure that stores key-value pairs.
 * It provides very fast lookups, insertions, and deletions - typically O(1) average time.
 *
 * Key Concepts:
 * 1. Hash Function: Converts a key into an array index
 * 2. Collision Handling: Deals with two keys hashing to the same index
 * 3. Dynamic Resizing: Grows the table when it gets too full
 */

/* ========================================================================
   PART 1: KeyValuePair Class
   ======================================================================== */

/**
 * KeyValuePair stores a single key-value pair in our hash table.
 *
 * Example: KeyValuePair("name", "John") stores the key "name" with value "John"
 */
class KeyValuePair<K, V> {
  // The key used to identify this entry
  public key: K;

  // The value associated with this key
  public value: V;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

/* ========================================================================
   PART 2: HashTable Class
   ======================================================================== */

/**
 * HashTable: A data structure for fast key-value storage and retrieval
 *
 * How it works:
 * 1. We store key-value pairs in an array
 * 2. A hash function converts each key to an array index
 * 3. If two keys map to the same index (collision), we find the next empty slot
 * 4. When the array gets full, we double its size and rehash everything
 *
 * Time Complexity:
 * - Average: O(1) for get, set, and delete
 * - Worst case: O(n) if many collisions occur
 */
class HashTable<K = string, V = string> {
  /** The initial size of our internal array (starts small, grows as needed) */
  private readonly INITIAL_SIZE: number = 3;

  /** How many key-value pairs we currently have stored */
  private count: number = 0;

  /** Our internal array that holds the key-value pairs (or null for empty slots) */
  private buckets: Array<KeyValuePair<K, V> | null> = [];

  /**
   * Constructor: Creates a new empty hash table
   */
  constructor() {
    // Start with a small array of empty slots (null values)
    this.buckets = new Array(this.INITIAL_SIZE).fill(null);
    this.count = 0;
  }

  /* ======================================================================
     PRIVATE HELPER METHODS
     ====================================================================== */

  /**
   * Hash Function: Converts a key into an array index
   *
   * This uses the FNV-1a algorithm - a fast, non-cryptographic hash function.
   *
   * Steps:
   * 1. Convert the key to a string, then to bytes
   * 2. Apply FNV-1a algorithm: XOR each byte, then multiply by a prime number
   * 3. Take modulo by array length to get a valid index (0 to length-1)
   *
   * Example: "John" might hash to index 2 in an array of size 3
   */
  private hash(key: K): number {
    // FNV-1a constants (magic numbers that make the hash function work well)
    const FNV_OFFSET_BASIS = 2166136261 >>> 0;
    const FNV_PRIME = 16777619 >>> 0;

    // Step 1: Convert key to string, then to bytes
    const keyString = String(key);
    const encoder = new TextEncoder();
    const bytes = encoder.encode(keyString);

    // Step 2: Apply FNV-1a algorithm
    let hashValue = FNV_OFFSET_BASIS;

    for (let i = 0; i < bytes.length; i++) {
      hashValue ^= bytes[i]; // XOR with current byte
      hashValue = Math.imul(hashValue, FNV_PRIME) >>> 0; // Multiply and keep 32-bit
    }

    // Step 3: Convert hash to valid array index using modulo
    const index = hashValue % this.buckets.length;
    return index;
  }

  /**
   * Collision Resolution: Finds an available slot when the primary slot is occupied
   *
   * Method: Linear Probing
   * - Start at the collision index
   * - Check next slot, then next, then next... (wrapping around to start if needed)
   * - Stop when we find what we're looking for
   *
   * Two modes:
   * 1. For SET: Find an empty slot OR a slot with the same key (to update)
   * 2. For GET: Find a slot with the same key
   *
   * Example:
   * Array: [Alice, Bob, null, null]
   * If "Charlie" hashes to index 0 (occupied by Alice),
   * we check index 1 (Bob), then index 2 (null - found it!)
   */
  private findSlot(key: K, startIndex: number, forSet: boolean): number {
    // Try each slot in sequence (linear probing)
    for (let i = 1; i < this.buckets.length; i++) {
      // Calculate next index to check (wraps around using modulo)
      const newIndex = (startIndex + i) % this.buckets.length;

      // Log collision resolution for learning purposes
      console.log(
        `[collision] key="${key}" original_index=${startIndex} trying_index=${newIndex}`
      );

      const slot = this.buckets[newIndex];

      if (forSet) {
        // For SET: accept empty slot OR slot with matching key
        if (slot === null || slot.key === key) {
          return newIndex;
        }
      } else {
        // For GET: only accept slot with matching key
        if (slot !== null && slot.key === key) {
          return newIndex;
        }
      }
    }

    // If we checked all slots and found nothing, return -1 (not found)
    return -1;
  }

  /**
   * Internal method to insert or update a key-value pair
   *
   * Steps:
   * 1. Hash the key to get an index
   * 2. If that slot is occupied by a different key, find another slot
   * 3. Insert new pair OR update existing pair
   */
  private insertPair(key: K, value: V): void {
    // Step 1: Get the index where this key should go
    let index = this.hash(key);

    // Step 2: Check if there's a collision (slot occupied by different key)
    const currentSlot = this.buckets[index];
    if (currentSlot !== null && currentSlot.key !== key) {
      // Collision! Find another slot using linear probing
      index = this.findSlot(key, index, true);
    }

    // If no slot found (table completely full - shouldn't happen due to resizing)
    if (index === -1) {
      throw new Error("Hash table is full - no available slot");
    }

    // Step 3: Insert or update
    if (this.buckets[index] === null) {
      // Slot is empty - insert new pair
      this.buckets[index] = new KeyValuePair<K, V>(key, value);
      this.count++; // Increment count for new entry
    } else if (this.buckets[index]!.key === key) {
      // Slot has same key - update existing value
      this.buckets[index]!.value = value;
    } else {
      // This shouldn't happen
      throw new Error("Hash table in inconsistent state");
    }
  }

  /**
   * Resize the hash table when it gets too full
   *
   * Why resize?
   * - When the table is full or nearly full, collisions increase
   * - This makes operations slower
   * - Solution: Double the array size and rehash everything
   *
   * Example:
   * Before: [Alice, Bob, Charlie] (3 slots, full)
   * After:  [null, Alice, null, Bob, null, Charlie] (6 slots, spread out)
   */
  private resizeIfNeeded(): void {
    // Check if resize is needed (when count reaches capacity)
    if (this.count < this.buckets.length) {
      return; // Still have room, no need to resize
    }

    console.log(
      `[resize] Growing from ${this.buckets.length} to ${
        this.buckets.length * 2
      } slots`
    );

    // Step 1: Save current entries
    const oldBuckets = this.buckets;

    // Step 2: Create new, larger array (double the size)
    const newSize = oldBuckets.length * 2;
    this.buckets = new Array(newSize).fill(null);

    // Step 3: Reset count (we'll recount as we insert)
    this.count = 0;

    // Step 4: Rehash all existing entries into the new array
    for (let i = 0; i < oldBuckets.length; i++) {
      const pair = oldBuckets[i];
      if (pair !== null) {
        // Re-insert this pair (it will hash to a new index in larger array)
        this.insertPair(pair.key, pair.value);
      }
    }
  }

  /* ======================================================================
     PUBLIC METHODS
     ====================================================================== */

  /**
   * GET: Retrieve a value by its key
   *
   * Steps:
   * 1. Hash the key to find its index
   * 2. If that slot has a different key, search for the right slot
   * 3. Return the value if found, or null if not found
   *
   * Example: table.get("name") might return "John"
   *
   * Time Complexity: O(1) average, O(n) worst case
   */
  public get(key: K): V | null {
    // Step 1: Hash the key to get starting index
    let index = this.hash(key);

    // Step 2: Check if we need to search for the key (collision case)
    const slot = this.buckets[index];
    if (slot !== null && slot.key !== key) {
      // Key is somewhere else due to collision - search for it
      index = this.findSlot(key, index, false);
    }

    // Step 3: Check if we found the key
    if (index === -1 || this.buckets[index] === null) {
      return null; // Key not found
    }

    // Verify we have the right key and return its value
    if (this.buckets[index]!.key === key) {
      return this.buckets[index]!.value;
    }

    // This shouldn't happen
    throw new Error("Hash table in inconsistent state during lookup");
  }

  /**
   * SET: Store a key-value pair in the hash table
   *
   * This is the main method for adding or updating entries.
   *
   * Steps:
   * 1. Check if we need to resize (if table is getting full)
   * 2. Insert or update the key-value pair
   *
   * Example: table.set("name", "John") stores name -> John
   *
   * Time Complexity: O(1) average, O(n) worst case (when resizing)
   */
  public set(key: K, value: V): void {
    // Step 1: Resize if needed (before insertion to ensure space)
    this.resizeIfNeeded();

    // Step 2: Insert or update the pair
    this.insertPair(key, value);
  }

  /**
   * SIZE: Get the number of key-value pairs stored
   *
   * Example: table.size() might return 5
   *
   * Time Complexity: O(1)
   */
  public size(): number {
    return this.count;
  }

  /**
   * PRINT: Display the internal structure of the hash table
   *
   * This is useful for learning and debugging.
   * Shows each slot in the array and whether it's empty or occupied.
   *
   * Example output:
   * -----------
   * [Size] 3
   * [0] Alice:alice@email.com
   * [1] null
   * [2] Bob:bob@email.com
   * ===========
   */
  public print(): void {
    console.log("-----------");
    console.log(`[Size] ${this.size()}`);

    // Show each slot in the array
    for (let i = 0; i < this.buckets.length; i++) {
      const slot = this.buckets[i];

      if (slot === null) {
        // Empty slot
        console.log(`[${i}] null`);
      } else {
        // Occupied slot - show key and value
        console.log(`[${i}] ${slot.key}:${slot.value}`);
      }
    }

    console.log("===========");
  }
}

/* ========================================================================
   PART 3: Demo and Testing
   ======================================================================== */

/**
 * This section demonstrates how to use the HashTable class.
 * Run this file to see the hash table in action!
 */

console.log("\n=== HASH TABLE DEMO ===\n");

// Create a new hash table
const table = new HashTable<string, string>();

// Show the empty table
console.log("1. Empty table:");
table.print();

// Add some entries
console.log("\n2. Adding three entries:");
table.set("Sinar", "sinar@gmail.com");
table.set("Elvis", "elvis@gmail.com");
table.set("Tane", "tane@gmail.com");
table.print();

// Retrieve a value
console.log("\n3. Looking up 'Sinar':");
const email = table.get("Sinar");
console.log(`[get] Sinar -> ${email}`);

// Add more entries (this will trigger a resize)
console.log("\n4. Adding two more entries (watch for resize):");
table.set("Gerti", "gerti@gmail.com");
table.set("Arist", "arist@gmail.com");
table.print();

// Verify everything still works after resize
console.log("\n5. Verify 'Sinar' is still there after resize:");
console.log(`[get] Sinar -> ${table.get("Sinar")}`);

// Update an existing value
console.log("\n6. Update 'Elvis' email:");
table.set("Elvis", "new.elvis@gmail.com");
console.log(`[get] Elvis -> ${table.get("Elvis")}`);

// Try to get a non-existent key
console.log("\n7. Look up non-existent key:");
const missing = table.get("NonExistent");
console.log(`[get] NonExistent -> ${missing}`);

console.log("\n=== DEMO COMPLETE ===\n");

/* 
  Key Takeaways:
  
  1. Hash tables provide O(1) average-case lookups
  2. Collisions are handled by linear probing (checking next slots)
  3. The table automatically resizes when it gets full
  4. After resizing, all entries are rehashed to new positions
  
  Try it yourself:
  - Add more entries and watch the collisions
  - Change INITIAL_SIZE to see different behaviors
  - Experiment with different key types (numbers, objects, etc.)
*/
