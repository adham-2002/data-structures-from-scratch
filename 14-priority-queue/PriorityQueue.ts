// PriorityQueue.ts

export interface QueueNode<T> {
  priority: number;
  data: T;
}

export default class PriorityQueue<T> {
  private heap: QueueNode<T>[] = [];
  private debug: boolean;

  constructor(debug: boolean = false) {
    this.debug = debug;
  }

  // ===== Helper Methods =====

  private parentIndex(i: number): number {
    return Math.floor((i - 1) / 2);
  }

  private leftChildIndex(i: number): number {
    return 2 * i + 1;
  }

  private rightChildIndex(i: number): number {
    return 2 * i + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private log(...msg: any[]): void {
    if (this.debug) console.log("[DEBUG]", ...msg);
  }

  // ===== Core Methods =====

  public enqueue(priority: number, data: T): void {
    const node: QueueNode<T> = { priority, data };
    this.heap.push(node);
    this.log("Enqueued:", node);

    this.bubbleUp(this.heap.length - 1);
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = this.parentIndex(index);
      if (this.heap[index].priority >= this.heap[parent].priority) break;

      this.log(
        "Swapping (bubble up):",
        this.heap[index],
        "<->",
        this.heap[parent]
      );
      this.swap(index, parent);
      index = parent;
    }
  }

  public dequeue(): [T, number] | null {
    if (this.heap.length === 0) {
      this.log("Queue empty - dequeue ignored");
      return null;
    }

    const root = this.heap[0];
    const last = this.heap.pop()!; // non-null assertion because we checked length above

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }

    this.log("Dequeued:", root);
    return [root.data, root.priority];
  }

  private sinkDown(index: number): void {
    const size = this.heap.length;

    while (true) {
      const left = this.leftChildIndex(index);
      const right = this.rightChildIndex(index);
      let smallest = index;

      if (
        left < size &&
        this.heap[left].priority < this.heap[smallest].priority
      ) {
        smallest = left;
      }

      if (
        right < size &&
        this.heap[right].priority < this.heap[smallest].priority
      ) {
        smallest = right;
      }

      if (smallest === index) break;

      this.log(
        "Swapping (sink down):",
        this.heap[index],
        "<->",
        this.heap[smallest]
      );
      this.swap(index, smallest);
      index = smallest;
    }
  }

  public hasData(): boolean {
    return this.heap.length > 0;
  }

  public size(): number {
    return this.heap.length;
  }

  public print(): void {
    const items = this.heap
      .map((item) => `${item.data}[${item.priority}]`)
      .join(" - ");
    console.log("Queue:", items);
  }

  public draw(): void {
    console.log("\n=== Heap Visualization ===");
    const size = this.heap.length;
    if (size === 0) {
      console.log("(empty)");
      return;
    }

    const levels = Math.floor(Math.log2(size)) + 1;
    let index = 0;

    for (let level = 0; level < levels; level++) {
      const count = Math.pow(2, level);
      let levelStr = "";

      for (let i = 0; i < count && index < size; i++) {
        const node = this.heap[index];
        levelStr += `${node.data}[${node.priority}]  `;
        index++;
      }

      console.log(levelStr);
    }
  }
}
