export default class Heap<T> {
  private dataList: T[];
  private _size: number;

  constructor() {
    this.dataList = [];
    this._size = 0;
    console.log("[Heap] Constructor called. Initialized empty heap.");
  }
  // i=0
  // datalist[0]=5
  // size=1
  // parentIndex = 0-1 /2 = -1
  //-----------------------------------
  // i=1
  // size = 1
  // datalist[1] =3
  // size =2
  // parentIndex = 1-1/2 = 0
  // ================================
  // 📥 Insert Element
  // ================================
  insert(data: T): void {
    console.log(`[Heap] insert called with data:`, data);
    let i = this._size;
    this.dataList[i] = data;
    this._size++;

    console.log(
      `[Heap] Inserted at index ${i}. Heap size is now ${this._size}.`
    );

    let parentIndex = Math.floor((i - 1) / 2);
    while (
      i !== 0 &&
      this.compare(this.dataList[i], this.dataList[parentIndex]) < 0
    ) {
      // Swap current element with parent
      [this.dataList[i], this.dataList[parentIndex]] = [
        this.dataList[parentIndex],
        this.dataList[i],
      ];

      console.log(
        `[Heap] Swapped index ${i} with parent index ${parentIndex}.`
      );

      i = parentIndex;
      parentIndex = Math.floor((i - 1) / 2);
    }
    console.log(
      "[Heap] insert complete. Current heap:",
      this.dataList.slice(0, this._size)
    );
  }

  // ================================
  // 📤 Remove Root Element
  // ================================
  pop(): T | null {
    console.log("[Heap] pop called.");
    if (this._size === 0) return null;

    const root = this.dataList[0];
    this.dataList[0] = this.dataList[this._size - 1];
    this.dataList[this._size - 1] = undefined as any;
    this._size--;

    console.log(
      `[Heap] Removed root: ${root}. Heap size is now ${this._size}.`
    );

    this.heapifyDown(0);
    console.log(
      "[Heap] pop complete. Current heap:",
      this.dataList.slice(0, this._size)
    );
    return root;
  }

  // ================================
  // 🧱 Maintain Heap Property
  // ================================
  heapifyDown(i: number): void {
    console.log(`[Heap] heapifyDown called at index: ${i}`);
    let leftIndex = 2 * i + 1;

    while (leftIndex < this._size) {
      const rightIndex = 2 * i + 2;

      let smallerIndex = leftIndex;
      if (
        rightIndex < this._size &&
        this.compare(this.dataList[rightIndex], this.dataList[leftIndex]) < 0
      ) {
        smallerIndex = rightIndex;
      }

      if (this.compare(this.dataList[smallerIndex], this.dataList[i]) >= 0) {
        break;
      }

      // Swap
      [this.dataList[i], this.dataList[smallerIndex]] = [
        this.dataList[smallerIndex],
        this.dataList[i],
      ];

      console.log(
        `[Heap] Swapped index ${i} with child index ${smallerIndex}.`
      );

      i = smallerIndex;
      leftIndex = 2 * i + 1;
    }
    console.log(
      "[Heap] heapifyDown complete. Current heap:",
      this.dataList.slice(0, this._size)
    );
  }

  // ================================
  // 🧮 Print Heap
  // ================================
  print(): void {
    console.log("[Heap] print called.");
    const values = this.dataList.slice(0, this._size);
    console.log(values.join(" - "));
  }

  // ================================
  // 📏 Get Heap Size
  // ================================
  size(): number {
    console.log("[Heap] size() called. Returning:", this._size);
    return this._size;
  }

  // ================================
  // 🎨 Visualize Heap as Tree
  // ================================
  draw(): void {
    console.log("[Heap] draw called.");
    if (this._size === 0) {
      console.log("(empty)\n");
      return;
    }

    const levelsCount = Math.floor(Math.log2(this._size)) + 1;
    const lineWidth = Math.pow(2, levelsCount - 1);

    let j = 0;
    for (let i = 0; i < levelsCount; i++) {
      const nodesCount = Math.pow(2, i);
      const space = Math.ceil(lineWidth - nodesCount / 2);
      let spaceBetween = Math.ceil(levelsCount / nodesCount);
      spaceBetween = spaceBetween < 1 ? 1 : spaceBetween;

      const k = j;
      let str = " ".repeat(space + spaceBetween);
      for (; j < k + nodesCount; j++) {
        if (j >= this._size) break;
        str += `${this.dataList[j]}${" ".repeat(spaceBetween)}`;
      }
      console.log(str + " ".repeat(space) + "\n");
    }
    console.log("[Heap] draw complete.");
  }

  // ================================
  // 🧩 Helper: Compare Elements
  // ================================
  compare(a: T, b: T): number {
    console.log("[Heap] compare called with:", a, b);
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
    throw new Error("Heap comparison only supports numbers by default.");
  }
}
