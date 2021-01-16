var n = 999
function f1() {
  console.log(n)
}
// 输出999，函数内部可以直接读取全局变量
f1()


function f2() {
  // 注意这里必须用var声明
  var n2 = 999
}

// error，无法获取n2
// console.log(n2)


// 由于js的链式作用域结构
// 子对象会一级一级向上寻找所有父对象的变量
// 父对象的所有变量，对子对象都是可见的
function f3() {
  var n3 = 999
  function f4() {
    console.log(n3)
  }
}

// 因此，只要把f4作为f3方法的返回值，就可以获取f3内的变量了
// 这段代码里的f6就是闭包

function f5() {
  var n5 = 999;
  return function f6() {
    console.log(n)
  }
}

var res = f5()
res() // 999


// 应用场景
// 1. 模块封装，防止变量污染全局

　var name = "The Window";

　　var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};

　　　　}

　　};

console.log(object.getNameFunc()());

　　var name = "The Window";

　　var object = {
　　　　name : "My Object",

　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};

　　　　}

　　};

console.log(object.getNameFunc()());


// 应用场景2，循环中创建闭包，防止获取意外的值

// 输出结果为 5 5 5 5 5
// 因为js为单线程运行环境，setTimeout注册的函数只有在线程空闲时才能执行，此时for循环已经结束，i为5
for (var i = 0; i < 5; ++i) {
  setTimeout(function() {
    console.log(i + " ");
  }, 100);
}

// 把setTimeout放在立即执行函数中，将i作为参数传给包裹函数，创建新的闭包
for (var i = 0; i < 5; ++i) {
  (function(i) {
    setTimeout(function() {
      console.log(i + " ");
    }, 100);
  })(i);
}

function add() {
  var x = 1;
  console.log(++x);
}

add(); //执行输出2,

add(); //执行还是输出2,

function add2() {
  var x = 1;
  return function() {
    console.log(++x);
  };
}
var num = add2();

num(); //输出2,

num(); //输出3,

num(); //输出4,