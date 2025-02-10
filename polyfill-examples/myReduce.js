const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 10;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

//console.log(sumWithInitial);

Array.prototype.myReduce = function (cb, initValue = 0) {
  //   let accumulator = initValue;
  for (let i = 0; i < this.length; i++) {
    // initValue += cb(a, c);
    // console.log("value of current", this[i]);
    // console.log("value of acc", initValue);

    // console.log("valur return by cb", cb(initValue, this[i]));

    initValue = cb(initValue, this[i]);
    // console.log("sum value", initValue);
    // console.log("----");
  }

  return initValue;
};

//final version
// Array.prototype.myReduce = function (cb, init = 0) {
//   for (let index = 0; index < this.length; index++) {
//     init = cb(init, this[index]);
//   }
//   return init;
// };

const result = array1.myReduce((a, c) => a + c, 50);
console.log(result);
