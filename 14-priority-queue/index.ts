// index.ts
import PriorityQueue from "./PriorityQueue";

const queue = new PriorityQueue<number>(true); // enable debug mode

queue.enqueue(5, 24);
queue.enqueue(5, 32);
queue.enqueue(3, 16);
queue.enqueue(3, 45);
queue.enqueue(1, 20);
queue.enqueue(1, 53);
queue.enqueue(2, 14);
queue.enqueue(2, 27);

queue.print();
queue.draw();

console.log("\n=== Dequeue Sequence ===");
while (queue.hasData()) {
  const result = queue.dequeue();
  if (result) console.log(`${result[0]} [${result[1]}]`);
}
`
`;
