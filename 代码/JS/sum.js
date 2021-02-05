
function add() {
  var sum = arguments[0];
  if(arguments.length === 1) {
    return function(sec) {
      return sum + sec;
    }
  }else {
    var num = 0;
    for(var i = 0; i < arguments.length; i++) {
      num = num + arguments[i];
    }
    return num;
  }
  // return tmp;
}
console.log(add(1,2));
console.log(add(1)(2));
function add2(x) {
  var sum = x;
  const temp = function(y) {
    return add2(sum + y)
  }
  temp.valueOf = function() {
    return sum;
  }
  return temp
}

console.log(add2(1)(2)());

const sum = a => b => b ? sum(a + b) : a;
console.log(sum(1)(2)(3)());


function sum() {
  var x = arguments[0];
  if(arguments.length === 1) {
    return function(sec) {
      return x + sec;
    }
  } else {
    var res;
    for(let i = 0; i < arguments.length; i++) {
      res = res + arguments[i];
    }
    return res;
  }
}