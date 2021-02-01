
/**
 * 步骤：
 * 1. 验证需要copy的内容是不是对象
 * 2. 初始化新变量
 * 3. 深拷贝每一个元素
 * 
 * 注意： 如果对象的属性引用自身，那么会导致无线递归
 * 所以需要利用一个map来记录所有已经拷贝过的对象
 */

const { mainModule } = require("process");



function deepCopy(obj, map = new Map()) {
  if(typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if(map.get(obj)) {
    return map.get(obj);
  }

  let copy;
  if(obj instanceof Array) {
    copy = [];
  } else {
    copy = {};
  }

  map.set(obj, copy);

  for(let key in obj) {
    // 保证只拷贝自身的属性，不拷贝到继承的属性
    if(obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key], map);
    }
  }

  return copy;
}
const test = {
  info: {
    name:'xinyi',
    nums:[12,3,4]
  }
}
const copy = deepCopy(test);
test.info.nums.push(12);

console.log(test, copy);
