// 键值对的集合，且键名不受限制

const { mainModule } = require("process");

const item = [
  ['name', 'xinyi'],
  ['title', 'author']
]

const map = new Map(item)
// 可以直接用数组作为参数，本质是forEach
console.log(map);
// 所有有interator接口、每个成员是双元素的数组的数据结构，都可以当做map构造函数的参数
// set和map也可以用来生成新的map

map.set(['a'],555)
// undefined，只有对同一个对象的引用，才视为同一个键
// map的键实际上是与内存地址绑定的，只有内存地址相同时，才能视为是同一个键，可以解决同名属性碰撞问题
// 如果是简单类型的值，只要值严格相等就可以
console.log(map.get(['a']));

const a = ['a']
map.set(a,555)
console.log(map.get(a));

// 0 和 -0 是同一个键
// 字符串true和布尔值true则不是
// NaN虽然不同于自身，但是map把它看做是同一个键
map.set(NaN, 111)
console.log(map.get(NaN));

// set方法，返回的是Map对象，所以可以用链式写法
map.set(NaN, 112).set(a,556)
console.log(map);

// 清除所有成员
// map.clear();

// map的默认接口是entries

// map也有forEach对象，和数组用法类似
map.forEach((key, item, map) => {
  console.log("key: %s, Value:%s", key, item);
})
// map的forEach可以添加第二个参数，用来绑定this
// 即回到函数的this的指向


// 1.map => array : ...运算符
// 2.array => map : new Map()
// 3.map => Object ： 如果键都是字符串，可以无损转换，否则把键转为对应字符串
// 4.Object => map ： Object.entries()

let obj = {
  'name' : 1,
  'gender' : 2
}

let map2 = new Map(Object.entries(obj))

// 自己实现
function objToMap(obj) {
  let map = new Map();
  for(let k of Object.keys(obj)) {
    map.set(k, obj[k]);
  }
  return map;
}