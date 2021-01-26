import { func } from "prop-types"

var data = {
  name: 'xinyi',
  height: 199
}
observe(data)
data.name = 'dongdong'

function Observer(data) {
  this.data = data;
  this.walk(data);
}

observer.prototype = {
  constructor: Observer,
  walk(data) {
    var me = this;
    Object.keys(data).forEach((key) => {
      me.convert(key, data[key])
    })
  },
  convert(key, val) {
    this.defineReactive(this.data, key, val)
  },
  defineReactive(data, key, value) {
    var dep = new Dep();
    // 监听子属性，用于对象的嵌套？对象内部还有对象的情况
    var childObj = observe(value);
    Object.defineProperty(data, key, {
      // 可枚举
      enumerable: true,
      // 不可再define
      configurable: false,
      get() {
        // target属性用于暂存watcher
        // 如果有订阅者
        if(Def.target) {
          dep.depend();
        }
        return value;
      },
      set(newValue) {
        if(newValue === value) {
          return;
        }
        console.log('监听到值变化了，', value, '--->', newValue);
        value = newValue;
        childObj = observe(newValue);
        // 通知所有的订阅者
        dep.notify();
      }
    })
  }
};

function observe(value, vm) {
  if(!value || typeof value !== 'object') {
    return;
  }
  return new Observer(value)
}


var uid = 0;

// 此时监听已经完成，只需要通知订阅者（一对多里的多）
function Dep() {
  // 订阅者的数组
  // 给每个订阅者分配id
  this.id = uid++;
  this.subs = []
}

Dep.prototype = {
  // 添加订阅者
  addSub(sub) {
    this.subs.push(sub);
  },
  depend() {
    Dep.target.addDep(this);
  },
  // 移除订阅者
  removeSub(sub) {
    var index = this.subs.indexOf(sub);
    if(index != -1) {
      this.subs.splice(index, 1);
    }
  },
  // 每次监听到变化时，给所有订阅者发送通知
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    })
  }
}

Dep.target = null;