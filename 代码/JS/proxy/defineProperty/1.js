var handler = {
  defineProperty: function(target, key, descriptor) {
    // 应该是对这个定义属性的描述
    console.log(descriptor);
    return false
  }
}

const p = new Proxy({}, handler);
p.number = 20;
console.log(p.number);