// 利用proxy对get的拦截来实现数组读取负数的索引

function createArray(...elements) {
  let handler = {
    get(target, properKey, receiver) {
      let index = Number(properKey);
      if (index < 0) {
        properKey = String(index + target.length);
      }
      return Reflect.get(target, properKey, receiver);
    }
  }

  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}

var arr = createArray('a','b','c');
console.log(arr[-1]);