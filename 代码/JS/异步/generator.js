function* gen(x) {
  // 此处yield已经返回(x+2)的值出去了，所以没有值赋给y了
  // 只能赋给y None
  var y = yield x + 2;
  // console.log(y)
  var z = yield y + 3;
  return z;
}
// 返回的不是结果，而是指针对象
var g = gen(1);
console.log(g.next());
// 此处需要自己给第二个yield前面的y赋值
console.log(g.next(2));

// 部署错误处理代码，捕获函数体外抛出的错误

function* gen2(x) {
  try {
    var y = yield x + 2;
  } catch (error) {
    console.log(error);
  }
  return y;
}

var g2 = gen2(1);
console.log(g2.next());
console.log(g2.throw('出错啦'));

// 异步任务的封装
var fetch = require('node-fetch');
function* gen3() {
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

var g3 = gen3();
var result = g3.next();
result.value.then((data) => {
  return data.json();
}).then(data => {
  g.next(data)
})