import ourArray from "./array";
(() => {
  const arr = [4654, 921, 762];
  const our = new ourArray();

  // Resize the array
  const resized = our.Resize(arr, 5);
  console.log(resized); // [4654, 921, 762, undefined, undefined]

  // Get an element
  const item = our.getAt(resized, 1);
  console.log(item); // 921
  console.log(resized[1]); // 921
})();
