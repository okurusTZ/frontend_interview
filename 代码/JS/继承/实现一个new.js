function _new(fn, ...args) {
  // fn是构造参数，通过prototype获取原型，然后生成对应的对象
  var obj = Object.create(fn.prototype);
  // 初始化一个对象
  const ret = fn.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}