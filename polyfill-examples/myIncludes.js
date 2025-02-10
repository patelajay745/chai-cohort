const arr = [1, 2, 3, 4, 5, 6, 7, 8];

//return true if element is in the array

// console.log(arr.includes(2));

Array.prototype.myInclude = function (value) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === value) {
      return true;
    }
  }
  return false;
};

console.log(arr.myInclude(12));
