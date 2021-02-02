// 递归写法
function wrap(arr) {
  let res = [];
  for(var item of arr) {
    if(item.constructor === Array) {
      res = res.concat(wrap(item))
    }else {
      res.push(item)
    }
  }
  return res;
}

let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]
console.log(wrap(arr));

// 迭代实现
const flatten = function(arr) {
  while(arr.some(item => Array.isArray(item))) {
    // 只要arr里还有array，就展开一层
    arr = [].concat(...arr)
  }
  return arr;
}

console.log(flatten(arr));
// 直接利用flat
console.log(arr.flat(Infinity));