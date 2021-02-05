var pipe = function(value) {
  // 用一个栈来存储之前调用的方法
  var funcStack = [];
  var proxy = new Proxy({}, {
    get: function(target, funcName) {
      // 如果是get方法，那么执行所有在栈里的方法
      if (funcName === 'get') {
        return funcStack.reduce(function(val, func){
          return func(val);
        }, value)
      }
      // 如果不是get方法，压栈
      funcStack.push(window[funcName]);
      return proxy;
    }
  });
  return proxy;
}

var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63