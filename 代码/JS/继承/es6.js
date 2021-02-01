// 利用extend实现继承
// es6的继承主要是类之间的继承。

class Father {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  teach() {
    console.log('Im teaching my child');
  }

  intro() {
    console.log('my name ' + this.name + 'my age' + this.age);
  }
}

class Child extends Father {
  constructor(name, age, gender) {
    // 这里必须super，因为子类是没有自己的this对象的
    // 需要靠super才能获取
    super(name, age);
    this.gender = gender;
  }

  intro() {
    console.log('my name ' + this.name + 'my age' + this.age + 'gender' + this.gender);
  }
}


var c = new Child('xinyi', 16, 'F')
c.intro()

// A extends B {}
// A.__proto__ === B; //继承属性
// A.prototype.__proto__ == B.prototype; // 继承方法

// class的方法是不可枚举的
console.log(Object.keys(Child));
// 必须使用new来调用
// 内部无法重写类名
// 变量不能提升，需要先声明类