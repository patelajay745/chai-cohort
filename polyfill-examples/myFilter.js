const arr = [1, 2, 3, 4, 5, 6];

Array.prototype.myFilter = function (cb) {
  const resultArray = [];
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index)) {
      resultArray.push(this[index]);
    }
  }
  return resultArray;
};

console.log(arr.myFilter((e) => e > 3));
