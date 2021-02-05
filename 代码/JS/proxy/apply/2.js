let handler = {
  apply: function(target, context, args) {
    return Reflect.apply(...arguments) * 100;
  }
}

function sum(left, right) {
  return left + right;
}

const proxy = new Proxy(sum, handler);

console.log(proxy(1,2));