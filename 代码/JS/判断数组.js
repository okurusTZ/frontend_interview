var arr = [1,2,3]
console.log(Object.prototype.toString.apply(arr));

console.log(Array.isArray(arr));

console.log(arr instanceof Array);
console.log(arr instanceof Object);
console.log(typeof arr);