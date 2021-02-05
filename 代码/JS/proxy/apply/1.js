// 拦截函数的调用，call和apply操作
var target = function() {
  return 'Im the target'
}

var handler = {
  apply: function() {
    return 'I am the apply'
  }
}

const proxy = new Proxy(target, handler);
console.log(proxy());