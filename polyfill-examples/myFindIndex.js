const array1 = [5, 12, 8, 130, 44];

//const isLargeNumber = (element) => element < 0;
// return the index of the first elemets in the array that pass  the condtion

//console.log(array1.findIndex((e) => e < 0));

Array.prototype.myFindIndex = function (cb) {
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i)) {
      return i;
    }
  }
  return -1;
};

console.log(array1.myFindIndex((e) => e > 13));
