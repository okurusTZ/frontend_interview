// 只要包含从0开始连续递增的键名和长度，就是类数组
var obj = {0:1, 1: 2, 2: 3, length: 3};

console.log(Array.from(obj));
// slice的定义
Array.prototype.slice = function(start, end) {
  var result = new Array();
  start = start || 0;
  // 通过call来指向对应的类数组对象
  end = end || this.length;
  for(var i = start; i < end; i++) {
    result.push(this[i]);
  }
  return result;
}
console.log(Array.prototype.slice.call(obj));
console.log([...obj]);