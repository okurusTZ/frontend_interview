// 简单改造下面的代码，使之分别打印 10 和 20var b = 10;
var b = 10;
(function b(){
  b = 20;
  console.log(b); 
})();

// 打印10
(function b(b){
  b.b = 20;
  console.log(b); 
})(b);

(function b(b){
  // console.log(this);
  // console.log(this.b);
  this.b = 20;
  console.log(b); 
})(b);

// 打印20
(function b(b){
  b = 20;
  console.log(b); 
})(b);

(function b(){
  // var 修饰的可以在代码块内部修改
  var b = 20;
  console.log(b); 
})();

