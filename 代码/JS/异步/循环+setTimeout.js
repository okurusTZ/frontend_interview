// const { time } = require("console");

// for (var i = 0; i< 10; i++){
//   // 闭包
//   // 通过闭包，把i的变量驻留在内存中，输出j时，引用的是外部函数的i
//   (function(j) {
//     setTimeout(() => {
//       console.log(j);
//       }, 1000)
//   })(i);
// }


// // 拆分结构，把定义和调用放到不同的部分
// function timer(i) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000);
// }

// for(let i = 0; i < 5; i++) {
//   timer(i)
// }


// 利用es6的let
// let会把i绑定到循环体的每一次迭代中，保证上一次迭代结束的值被重新赋值
// 主要还是因为let的变量只在当前作用域中起作用，所以for循环一次就会有一个i值
// 没进入一次循环体，就是一个新的作用域
// 而setTimeout的回调函数属于一个新的域，let声明的块变量可以作用于这个块，所以就可以使用它了。
// for (let i = 0; i< 10; i++){
//   // 相当于每次让let l2 = l;
//     setTimeout(() => {
//       console.log(i);
//       }, 1000)
// }
// for (let i=1; i<=5; i++) {
//   setTimeout( function timer() {
//       console.log( i );
//    }, i*1000, i );
// }


for (var i = 0; i< 10; i++){
  // 相当于每次让let l2 = l;
    let i2 = i;
    // 每次使用的当时当前作用域的i2
    setTimeout(() => {
      console.log(i2);
      }, 1000)
}