function unique(arr) {
  // es6的新数据结构，保存键值对
  const res = new Map();
  // 利用filter过滤掉不符合表达式的元素
  return arr.filter((a) => !res.get(a) && res.set(a,1));
}

function unique2(arr) {
  // 从一个类似数组或可迭代的对象中创建一个新的数组实例
  /**
   * Array.from('foo) 
   * // ['f','o','o']
   */

  //  set对象允许存储唯一值，所以去重了
  return Array.from(new Set(arr));
}
console.log(unique2([1,1,1,2,2,2,3,45]))