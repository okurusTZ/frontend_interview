// 成员只能是对象，不能是其他类型的值
// 针对set无法解决的对象问题产生

// weakSet中的对象都是弱引用，当其他对象都不再引用该对象的时候，
// 垃圾回收机制将不考虑weakSet是否引用，直接回收该对象

// 适合临时存放一组对象，或者与对象绑定的信息（一旦对象在外部消失，那么在weakSet里的引用也自动消失
// weakSet不可遍历，因为垃圾回收机制运行前后，成员个数可能是不同的。

// weakSet可以接受数组或者类似数组的对象作为参数
// 但是数组内部的成员必须是对象
const a = [[1,2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1,2], [3,4]}


// const b = [3,4];
// const ws2 = new WeakSet(b);
// 这里b的成员不是对象，加入ws就会报错

// 作用：存储DOM节点而不用担心移除时发生内存泄漏

const foos = new WeakSet();
class Foo {
  constructor() {
    foos.add(this);
  }
  method() {
    if(!foos.has(this)) {
      throw new TypeError('Foo.prototye.method can only be used on Foo实例！')
    }
  }
}

foo = new Foo()
// 保证Foo的实例方法只能在Foo实例上调用，foos对实例的引用，
// 不会被计入内存回收机制内，删除实例的时候，不需要考虑到foos
foo.method()