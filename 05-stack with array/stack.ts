class stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
    console.log(`Pushed: ${item}`);
  }
  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items.pop()!;
  }
  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  size(): number {
    return this.items.length;
  }
  clear(): void {
    this.items = [];
    console.log("Stack cleared");
  }
}
export default stack;
