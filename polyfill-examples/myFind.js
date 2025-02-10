const array1 = [5, 12, 8, 130, 44];

//return the first element which pass the condtion

const found = array1.find((element) => element > 10000);

//console.log(found);

Array.prototype.myFind = function (cb) {
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index)) {
      return this[index];
    }
  }
  return undefined;
};

console.log(array1.myFind((element) => element > 10));
