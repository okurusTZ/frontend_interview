/**
 * watcher里需要做的事情
 * 1. 自身实例化的时候，往属性订阅器里添加自己
 * 2. 自身必须有个update方法
 * 3. 待属性变动dep.notify()的时候，可以调用自身的update方法
 */

function Watcher(vm, expOrFn, cb) {
  // callback
  this.cb = cb;
  // Vue对象
  this.vm = vm;
  this.expOrFn = expOrFn;
  this.depIds = {};

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = this.parseGetter(expOrFn.trim());
  }
  this.value = this.get();
}

Watcher.prototype = {
  update() {
    this.run();
  },
  run() {
    var value = this.get();
    var oldValue = this.value;
    if(value !== oldValue) {
      this.value = value;
      // 执行compile中绑定的回调，更新视图
      this.cb.call(this.vm, value, oldValue);
    }
  },
  /**
   * 每次调用run()的时候，因为获取了value，所以或触发对应的getter
   * getter里面又触发了dep.depend(),继而触发addDep()
   * 
   * 假如当前的dep.id已经在watcher的depIds里面了，说明不是一个新的属性，仅仅是改变了值
   * 不需要将当前watcher添加到该属性的dep里去
   * 如果是新的属性，则添加
   * e.g.
   * vm.child = {name: 'a'} 改变了child.name的值，child.name就是一个新的属性
   * 因此需要将watcher(child.name)假如到child.name的dep里
   * 因为此时child.name是一个新的值，所以setter和dep都已经失效，
   * 通过child.name = xxx 赋值时，对应的watcher收不到通知
   * 
   * 子属性的watcher在添加到子属性的dep同时，也会添加到父属性的dep
   */
  addDep(dep) {
    // 判断自身属性是否存在
    if(!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this);
      this.depIds[dep.id] = dep;
    }
  },
  get() {
    // this为Watcher对象
    Dep.target = this;
    // 触发getter，把自己添加到属性订阅器中
    var value = this.vm[exp];
    // 添加完之后清空
    Dep.target = null;
    return value;
  },
  parseGetter(exp) {
    if (/[^\w.$]/.test(exp)) return;
    var exps = exp.split('.');
    return function(obj) {
      for (var i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    }
  }
}