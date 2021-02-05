var arr = [12,34,5,6];

// 1. isArray
console.log(Array.isArray(arr));

// 2.instanceof 
console.log(arr instanceof Array);

// 3.toString()
console.log(Object.prototype.toString.call(arr));

// constructor
console.log(arr.constructor);
