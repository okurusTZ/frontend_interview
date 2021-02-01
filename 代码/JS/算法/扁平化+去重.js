function flat(arr) {
  // 核心思想，遍历数组，如果得到的是数组，就继续递归，最后concat起来
  let res = []
  for(let item of arr) {
    // 如果为数组，继续遍历
    if (Array.isArray(item)) {
      res = res.concat(flat(item));
    } else {
      // 如果为数字，可以push进去~
      res.push(item)
    }
  }
  return res;
}

arr =  [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
console.log(flat(arr));


// flat函数，将n维的数组展平
console.log(arr.flat(Infinity));
console.log(Array.from(new Set(arr.flat(Infinity))).sort((a,b) => {
  return a - b;
}));