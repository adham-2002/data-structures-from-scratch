export class Queue<T> {
  private items: T[] = [];
  enqueue(data: T) {
    this.items.push(data);
  }
  dequeue(): T | undefined {
    return this.items.shift();
  }
  peek(): T | undefined {
    return this.items[0];
  }
  hasData(): boolean {
    return this.items.length > 0;
  }
  size(): number {
    return this.items.length;
  }
}
