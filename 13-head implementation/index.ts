import Heap from "./heap";

const heap = new Heap<number>();

heap.insert(5);
heap.insert(3);
heap.insert(8);
heap.insert(1);

heap.print(); // 1 - 3 - 8 - 5
heap.draw();

while (heap.size() > 0) {
  console.log("Popped:", heap.pop());
}
