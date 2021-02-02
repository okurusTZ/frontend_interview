var b = 10;
(function b(){
    b = 20;
    // 非匿名的自执行函数，函数名是只读的，不可以修改
    console.log(b); 
})();