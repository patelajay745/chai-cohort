arr = [1, 2, 3];

Array.prototype.myForEach = function (cb) {
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i);
  }
};

// arr.myForEach((element) => {
//   console.log("this is my element: ", element);
// });

function callbackfuntion(element) {
  if (element > 2) {
    return element;
  }
}

//const a = arr.map((elemt) => callbackfuntion(elemt));
//console.log(arr.map((element) => { callbackfuntion(element) }); //

//console.log(a);

Array.prototype.myFilter = function (cb) {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i)) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

Array.prototype.myMap = function (cb) {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    newArray.push(cb(this[i], i));
  }
  return newArray;
};

const r = arr.myMap((e) => {
  return e * 4;
});

console.log(arr.myFilter((e) => e > 2));

// console.log(r);
