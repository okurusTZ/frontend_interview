// set不会进行类型的转换
// 如下，3和'3'被认为是不同的
console.log([...new Set([1,2,3,'3',4,4])]);


// 在set中，对象总是被认为是不同的
let set = new Set();
set.add({})
// 1
console.log(set.size); 
set.add({})
// 2
console.log(set.size);
console.log(set);

// 从set转为数组
const array = Array.from(set);

// set的键值和键名是完全相等的
let set2 = new Set(['red', 'blue', 'yellow']);
for(let item of set2.keys()) {
  // red
  // blue
  // yellow
  console.log(item);
}
for(let item of set2.values()) {
  // 是默认的遍历方法
  // for (let item of set2) {}
  // red
  // blue
  // yellow
  console.log(item);
}
for(let item of set2.entries()) {
  // 返回键名和键值，是完全相同的
  // ['red', 'red']
  // ...
  console.log(item);
}

// 数组的map和filter也可以间接用于set
let set3 = new Set([1,2,3])
set3 = new Set([...set3].filter(x => ( x % 2) == 0));


// set 可以轻松实现交并差集
let a = new Set([1,2,3])
let b = new Set([3,4,5])

let union = new Set([...a, ...b])
console.log(union);

let intersect = new Set([...a].filter(item => b.has(item)))
console.log(intersect);

let difference = new Set([...a].filter(item => !b.has(item)))
console.log(difference);