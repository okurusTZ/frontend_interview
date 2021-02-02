// 利用原型链，让一个引用类型继承另一个引用类型的属性和方法（prototype和构造函数实现
// 实质， 将父类添加到子类的原型链上去

// 1.原型：每一个js对象创建时，会与另一个对象关联，这个对象就是原型
// 每一个对象都会从原型里继承值

function Person(age) {
  this.age = age;
}

Person.prototype.name = 'XINYI';
var p1 = new Person();
var p2 = new Person();

// 都是XINYI，因为继承了其原型的name
console.log(p1.name);
console.log(p2.name);


// 2. __proto__
// 每个对象都会有的属性，指向该对象的原型
// true
// 本身更像是一个getter/setter，当执行p1.__proto__的时候
// 可以理解为Object.getPrototypeOf(p1)
console.log(p1.__proto__ === Person.prototype);


// 3.constructor
// 每个原型都有一个constructor函数，指向对应的构造函数

console.log(Person === Person.prototype.constructor);
// 一样会返回true
// 因为虽然没有constructor·这个属性，但是会从原型里去读取
console.log(Person === p1.constructor);

// 当读取实例的属性时，如果找不到，就会去原型里找，如果还是找不到，就去原型的原型里找

// Person的原型对象的原型是Object
console.log(Person.prototype.__proto__);
// Object的原型对象的原型是null，相当于没有原型
console.log(Object.prototype.__proto__)

// 原型链是互相关联的原型组成的链状结构
// 在此处原型链即是： p1 -> Person.prototype -> Object.prototype -> null

// 所以es5的继承的实现方法就是，利用原型类，让一个引用类型继承另一个类型的属性和方法
// 利用prototye和构造函数实现
// 把父类添加到子类的继承链上去


// 例子

function Father() {
  this.word = 'Im father'
  this.c = 1;
}

Father.prototype.saySomething = function() {
  console.log(this.word);
}

// 继承
Child.prototype = new Father()

function Child() {
  Child = 'Children';
  this.word = 'Im child'
}


Child.prototype.play = function() {
  console.log('Im playing!');
}

var c = new Child();
c.saySomething()
console.log(c.hasOwnProperty('c')); // false
console.log(c.hasOwnProperty('word')); // true


// 如何判断是不是自身拥有的属性：hasOwnProperty方法

console.log(Object.keys(Child.prototype));

// 可以内部重写类名

// 变量会提升：不需要先声明构造方法

// 原型对象的优点： 
// 1.所有对象实例可以共享它包含的方法和属性
// 2.调用耗时较少

// 缺点：
// 1.不能向超类型的构造函数传参
// 2.包含引用类型值的原型，会被所有实例共享