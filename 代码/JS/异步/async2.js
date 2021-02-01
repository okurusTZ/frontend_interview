function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
  return ms;
}

// asyn 函数的返回值，会成为then方法回调函数的参数
asyncPrint('hello', 50).then(
  v => console.log('resolve', v),
  e => console.log('reject', e)
);


// getTitle内部有三个操作
// 1.抓取网页
// 2.取出文本
// 3. 匹配页面标题
// 全部完成之后，才会执行then里的log方法
var fetch = require('node-fetch')

async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
// 此处的then只有在async函数内的所有异步操作都执行完之后才会调用对应的回调函数
getTitle('https://tc39.github.io/ecma262/').then(console.log)