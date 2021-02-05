const { type } = require("os");

let validator = {
  set: function(target, properKey, value, proxy) {
    if (!Number.isInteger(value)) {
      throw new TypeError('the age should be an integer');
    }
    if (value > 200) {
      throw new TypeError('the age should be lower than 200');
    }

    // 对于合适的值，直接保存
    target[properKey] = value;
  }
}

var proxy = new Proxy({}, validator);
proxy.age = 100;
proxy.age = 'haha'
proxy.age = 400;