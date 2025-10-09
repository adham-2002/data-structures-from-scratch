export class Queue<T> {
  private dataList: T[] = [];

  enqueue(data: T): void {
    this.dataList.push(data);
  }

  dequeue(): T | undefined {
    return this.dataList.shift();
  }

  peek(): T | undefined {
    return this.dataList[0];
  }

  hasData(): boolean {
    return this.dataList.length > 0;
  }

  size(): number {
    return this.dataList.length;
  }
}
