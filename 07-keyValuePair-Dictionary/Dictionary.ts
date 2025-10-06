/**
 * A simple Dictionary implementation that matches the C++ version.
 * Uses a dynamic array to store key-value pairs.
 */
export class Dictionary<TKey, TValue> {
  private static readonly INITIAL_CAPACITY = 3;

  private readonly growthIncrement: number;
  private entries: Array<{ first: TKey; second: TValue }>;
  private entriesCount: number;

  constructor() {
    this.growthIncrement = Dictionary.INITIAL_CAPACITY;
    this.entries = new Array(Dictionary.INITIAL_CAPACITY);
    this.entriesCount = 0;
  }

  /**
   * Checks if the dictionary needs to be resized.
   * @returns true if resize is needed, false otherwise
   * @private
   */
  private needsResize(): boolean {
    return this.entriesCount >= this.entries.length;
  }

  /**
   * Resizes the dictionary by growing the internal array.
   * @private
   */
  private resize(): void {
    const currentCapacity = this.entries.length;
    const newCapacity = currentCapacity + this.growthIncrement;

    console.log(`[resize] from ${currentCapacity} to ${newCapacity}`);

    const newEntries = new Array<{ first: TKey; second: TValue }>(newCapacity);
    for (let i = 0; i < this.entries.length; i++) {
      newEntries[i] = this.entries[i];
    }
    this.entries = newEntries;
  }

  /**
   * Gets the number of entries in the dictionary.
   * @returns The count of entries
   */
  Size(): number {
    return this.entriesCount;
  }

  /**
   * Sets a key-value pair in the dictionary.
   * If the key already exists, updates the value.
   * @param key - The key to set
   * @param value - The value to associate with the key
   */
  Set(key: TKey, value: TValue): void {
    const existingIndex = this.findEntryIndex(key);

    if (existingIndex !== -1) {
      this.updateEntry(existingIndex, value);
      return;
    }

    this.addNewEntry(key, value);
  }

  /**
   * Finds the index of an entry with the specified key.
   * @param key - The key to search for
   * @returns The index of the entry, or -1 if not found
   * @private
   */
  private findEntryIndex(key: TKey): number {
    for (let i = 0; i < this.entriesCount; i++) {
      if (this.entries[i].first === key) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Updates the value of an existing entry.
   * @param index - The index of the entry to update
   * @param value - The new value
   * @private
   */
  private updateEntry(index: number, value: TValue): void {
    this.entries[index].second = value;
  }

  /**
   * Adds a new entry to the dictionary.
   * @param key - The key to add
   * @param value - The value to add
   * @private
   */
  private addNewEntry(key: TKey, value: TValue): void {
    if (this.needsResize()) {
      this.resize();
    }
    this.entries[this.entriesCount] = { first: key, second: value };
    this.entriesCount++;
  }

  /**
   * Gets the value associated with the specified key.
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not found
   */
  Get(key: TKey): TValue | undefined {
    const index = this.findEntryIndex(key);
    return index !== -1 ? this.entries[index].second : undefined;
  }

  /**
   * Removes a key-value pair from the dictionary.
   * @param key - The key to remove
   * @returns true if the key was found and removed, false otherwise
   */
  Remove(key: TKey): boolean {
    const index = this.findEntryIndex(key);

    if (index === -1) {
      return false;
    }

    this.removeEntryAtIndex(index);
    return true;
  }

  /**
   * Removes an entry at the specified index by swapping with the last entry.
   * @param index - The index of the entry to remove
   * @private
   */
  private removeEntryAtIndex(index: number): void {
    const lastIndex = this.entriesCount - 1;
    this.entries[index] = this.entries[lastIndex];
    this.entriesCount--;
  }

  /**
   * Prints all entries in the dictionary to the console.
   */
  Print(): void {
    this.printHeader();
    this.printEntries();
    this.printFooter();
  }

  /**
   * Prints the header section of the dictionary output.
   * @private
   */
  private printHeader(): void {
    console.log("----------");
    console.log(`[size] ${this.Size()}`);
  }

  /**
   * Prints all entries in the dictionary.
   * @private
   */
  private printEntries(): void {
    for (let i = 0; i < this.entries.length; i++) {
      this.printEntry(i);
    }
  }

  /**
   * Prints a single entry at the specified index.
   * @param index - The index of the entry to print
   * @private
   */
  private printEntry(index: number): void {
    if (index < this.entriesCount) {
      const entry = this.entries[index];
      console.log(`[${index}]${entry.first}:${entry.second}`);
    } else {
      console.log(`[${index}]`);
    }
  }

  /**
   * Prints the footer section of the dictionary output.
   * @private
   */
  private printFooter(): void {
    console.log("==========");
  }
}
