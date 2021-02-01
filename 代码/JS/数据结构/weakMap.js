// 只接受对象作为键名，不接受其他类型
// 键名所指向的对象，不计入垃圾回收机制。

// 有时候我们想在某个对象上存放一些数据，但是会造成对这个对象的引用，需要手动删除
// 利用weakMap则可以解决这个问题。
// 典型应用，往DOM上添加数据

// 但对键值仍然是正常引用

let obj = {'name' : 'xinyi'};
const wm = new WeakMap();
let key = {};
wm.set(key, obj);
obj = null;
// 即使对obj置为null（消除了外部引用），wm内部仍然可以获取对象。
console.log(wm.get(key));

// 同一样没有遍历操作，在垃圾回收机制下不可预知
// 不可取到keys()/values()/size/entries()，因为键名是否存在不可预知

// 仅存在 set/get/has/delete


// 部署私有属性

const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    // 注意这里如果删除实例，对应的也会消失，是弱引用，不会造成内存泄漏。
    _counter.set(this, counter);
    _action.set(this, action);
  }

  dec() {
    let counter = _counter.get(this);
    if(counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if(counter === 0) {
      // 执行对应的action方法
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE!'));

c.dec();
c.dec();