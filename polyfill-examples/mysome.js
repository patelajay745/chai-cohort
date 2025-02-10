const arr = [1, 2, 3, 4, 6, 5, 7, 8, 9];

//check if any condition is true then return true

function callbackFunction(element) {
  return element % 5 === 0;
}

// console.log(arr.some((element) => callbackFunction(element)));

Array.prototype.mySome = function (cb) {
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index)) {
      return true;
    }
  }
  return false;
};

console.log(arr.mySome((e) => e % 15 === 0));