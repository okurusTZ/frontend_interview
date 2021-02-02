var a = 10;
(function () {
    var a;
    // 此时a没有被赋值，所以得到的结果是undefined
    console.log(a) 
    // 是对局部的a赋值，即函数体内的var a； 
    a = 5
    console.log(window.a)
    // 变量提升机制，var a;会被提升到最上方
    var a = 20;
    console.log(a)
})()