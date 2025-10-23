class ourArray<T> {
  public Resize(source: T[], newSize: number): (T | undefined)[] {
    //1) check if new size less than zero
    if (newSize < 0) {
      return source; // just return source
    }

    //2) check if provide source is array or not
    if (!Array.isArray(source)) return [];
    //3) create new array for new size
    const newArray: (T | undefined)[] = new Array(newSize);
    //4) we need to know when the loop stop
    // => we can't use newSize because maybe the source less than newsize so it will give error when access array index that not index
    // => we can't use source.length because the newsize maybe less than source.length in this case give also it will no find place to inert in array
    // =< solution use the min between them
    const minSize = Math.min(source.length, newSize);
    //5) move the data to the new created array
    for (let i = 0; i < minSize; i++) {
      newArray[i] = source[i];
    }
    return newArray;
  }
  public getAt(source: T[], index: number): undefined | T {
    if (source.length < 0 || index >= source.length) return undefined;
    return source[index];
  }
}
export default ourArray;
