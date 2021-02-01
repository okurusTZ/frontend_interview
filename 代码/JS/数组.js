var arr = [1, 2, 'haha', true]
console.log(arr[3]);


// 遍历数组
// 1. for 循环

// 新增元素

// 修改length长度
var arr2 = [1,2,3]
arr2.length = 5
console.log(arr2);
// 2.新增数组元素，修改索引号，追加数组
var arr3 = [1,2,3,4]
arr3[4] = 5
console.log(arr3);

// 筛选数组
arr = [1,2,3,4,5,6,7,100]
var newArr = arr.filter(item => {
  return item > 10 // 这样也可以，直接返回的就是大于10的item
})

console.log(newArr);

function sum(num1, num2) {
  console.log(num1 + num2)
}

// 实参多于形参，求前几个
sum(12,3,4)
// 实参少于形参，undefined
sum(12)


/**
 * map的第一个参数是一个回调函数
 * 这个callback一共可以接受3个参数，分别是当前处理的元素，该元素的索引和整个arr
 * 对于parseInt来说，接受的是
 * parseInt(1,0)
 * parseInt(2,1)
 * parseInt(3,2)
 * 
 * 其中parseInt函数是把字符串转化成数字的函数
 * parseInt(string, radix)
 * radix表示使字符串转化成相应基数的整数
 * 
 * parseInt(1,0) => 1
 * parseInt(2,1) => 一进制中，没有2这个数，所以返回NaN
 * parseInt(3,2) => 二进制中，没有3这个数，所以返回NaN
 */
// ['1','2','3'].map(parseInt)

// 最终输出 [1, NaN, NaN]

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