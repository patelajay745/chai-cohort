const arr = [1, 2, 3, 4, 5, 6];

Array.prototype.myMap = function (cb) {
  const resultArray = [];
  for (let index = 0; index < this.length; index++) {
    resultArray.push(cb(this[index], index));
  }
  return resultArray;
};

console.log(arr.myMap((e) => e * 5));
