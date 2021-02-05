var target = {};
var obj = new Proxy(target, {
  get(target, properKey, receiver) {
    // receiver总是指向原始读的操作所在的那个对象
    console.log('获取了' + properKey);
    // 必须得return，不然就失去原来的作用了
    return Reflect.get(target, properKey, receiver)
  },
  set(target, properKey, value, receiver) {
    console.log('修改了' + properKey + '为' + value);
    return Reflect.set(target, properKey, value, receiver)
  }
})

obj.count = 1;
++obj.count;
// 这里访问obj就是访问target
console.log(target.count);