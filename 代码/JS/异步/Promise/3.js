console.log('script start')
let promise1 = new Promise(function (resolve) {
   // 这里的部分本身是立即执行的
    console.log('promise1')
    // 执行resolve或者reject的时候，是异步的，会限制性then/catch
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')