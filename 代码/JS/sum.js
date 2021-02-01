
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