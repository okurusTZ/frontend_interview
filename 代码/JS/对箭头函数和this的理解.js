

// // 声明式写法
// function test(name) {
//   console.log(name)
//   console.log(this)
// }
// test('xinyi')
// // 实际上的完整写法
// test.call(undefined, 'Xinyi')
// // call的第一个参数就是this，如果传了null或者undefined，window就是默认的context
// // 所以此处打印的this是window对象

// // 赋值式写法
// // let test2 = function(name) {
// //   console.log(name)
// // }
// // test2('dongdong')

// // // 箭头函数
// // const test3 = (name) => {
// //   console.log(name)
// // }
// // test3('huangguan')

// const obj = {
//   name: 'Xinyi',
//   greeting() {
//     console.log(this.name)
//   }
// }
// 对象中的函数调用， this是可以指定的

// 第一种是第二种的语法糖
// obj.greeting()
// 可以手动指定this
// obj.greeting.call({name: 'dongdong'}) // 打印出来的是dongdong

// // 构造函数中的this是一个对象，也就是context上下文
// function Test() {
//   this.name = 'Tom'
// }
// let p = new Test()
// console.log(typeof p)


// 箭头函数的特性一：默认绑定外层this
// 箭头函数中的this的值和外层的this是一样的
// const obj = {
//   a() {
//     console.log(this)
//   }
// }
// obj.a() // 打印出的是obj对象


// 特性二，不能用call方法修改里面的this
const obj = {
  a: () => {
    console.log(this)
  }
}
obj.a()
obj.a.call('123')