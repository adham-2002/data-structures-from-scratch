class OurArray {
  // Resizes the given array to the new size
  resize<T>(source: T[], newSize: number): (T | undefined)[] {
    if (newSize <= 0) return source;
    if (!Array.isArray(source)) return [];

    // Create a new array with requested size
    const newArray: (T | undefined)[] = new Array(newSize);

    // Copy elements manually (simulate memcpy with loop)
    const minSize = Math.min(source.length, newSize);
    for (let i = 0; i < minSize; i++) {
      newArray[i] = source[i];
    }

    // Fill remaining slots with undefined (like uninitialized in C++)
    for (let i = minSize; i < newSize; i++) {
      newArray[i] = undefined;
    }

    return newArray;
  }

  // Returns the item at the given index
  getAt<T>(source: T[], index: number, sizeOf: number = 1): T | undefined {
    if (index < 0 || index >= source.length) return undefined;
    // Simulate pointer arithmetic (address = base + index * sizeOf)
    // In JS we can only "simulate" using array indexing
    return source[index];
  }
}

// ------------------- Usage -------------------

(() => {
  const arr = [4654, 921, 762];
  const our = new OurArray();

  // Resize the array
  const resized = our.resize(arr, 5);
  console.log(resized); // [4654, 921, 762, undefined, undefined]

  // Get an element
  const item = our.getAt(resized, 1, 4); // 4 bytes = sizeof(int)
  console.log(item); // 921
  console.log(resized[1]); // 921
})();
