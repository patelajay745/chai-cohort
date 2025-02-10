const arr = [1, 2, 3, 4, 5, 6, 7, 8];
//return true if every element pass the condition

//console.log(arr.every((e) => e > 0));

Array.prototype.myEvery = function (cb) {
  for (let i = 0; i < this.length; i++) {
    if (!cb(this[i], i)) {
      return false;
    }
  }
  return true;
};

console.log(arr.myEvery((e) => e > 0));
