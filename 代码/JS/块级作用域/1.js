function f() {
  console.log('I am outside~');
}

(
  function() {
    // 变量提升了
    // 避免使用函数声明语句，尽量使用函数表达式
    var f = undefined;
    if(false) {
      function f() {
        console.log('I am inside~');
      }
    }
    // not a function
    // 因为es6里面把代码块里的function看做是var声明的
    // 会提升到全局
    f();
  }
)();