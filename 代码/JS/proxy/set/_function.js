let handler = {
  get: function(target,key) {
    filter(key);
    return target[key];
  },
  set:function(target, key, value) {
    filter(key);
    target[key] = value;
    return true;
  }
}

function filter(name) {
  if(name[0] === '_'){
    throw new TypeError('it is a inner function!');
  }
}

const target = {};
const proxy = new Proxy(target, handler);
proxy._prop;