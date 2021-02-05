var handler = {
  construct: function(target, args) {
    console.log('called ' + args.join('/'));
    return {value : args[0] * 10}
  }
}

// 因为construct拦截的是构造函数，所以目标对象必须是函数
const p = new Proxy(function() {}, handler);
console.log(new p(1, 20).value);