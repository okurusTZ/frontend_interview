
// 递归
function Fib(num) {
  if(num === 1 || num === 2) {
    return 1;
  }
  return Fib(num - 1) + Fib(num - 2)
}

// console.log(Fib(2))

// 利用memo记录
// 闭包实现
const Fib2 = function() {
  var memo = [0, 1];
  var f = function(n) {
    var res = memo[n];
    if(typeof res !== 'number') {
      memo[n] = f(n-1) + f(n-2);
      res = memo[n];
    }
    return res;
  }
  return f;
}();
console.log(Fib2(30))