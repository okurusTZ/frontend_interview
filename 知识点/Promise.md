### Promise语法

##### 核心思想

如果数据就绪(promised)，那么(then)做点什么。

```javascript
const promise = new Promise((resolve, reject) => {
    // do something
    
    if(/* 异步操作成功 */) {
       resolve(value)
	}else {
       reject(error)
    }
});
```

**resolve**的作用是，把promise从pending变为fullfill，异步操作成功的时候调用，并把异步操作的结果作为参数传递出去。

**reject**的作用是，把promise从pending变为reject，异步操作失败的时候调用，并把异步操作报出的错误作为参数传递出去。

可以用then方法指定fullfill状态和reject状态的回调函数。

```javascript
promise.then(value => {
    // success
}, error => {
    // failure
})
```

> then返回的是一个Promise类型，所以可以采用链式写法，继续调用then

**Promise.prototye.catch**用于指定发生错误时的回调函数。同样返回的是一个Promise对象。



### 注意

1. resolve和reject的参数可以是另一个promise值

   ```javascript
   const p1 = new Promise((resolve, reject) => {
       // ...
   })
   
   const p2 = new Promise((resolve, reject) => {
       // ...
       resolve(p1);
   })
   ```

   > 此时p2的状态由p1来决定，如果p1是pendding，那么p2的回调函数会等待p2的状态改变，如果p1是resolve或reject，那么p2的回调函数会立即执行。

2. 调用resolve或reject不会终止Promise的参数函数执行

3. then是定义在原型对象上的

4. 如果没有catch处理，那么Promise对象抛出的错误不会传递到外层代码，不会有任何反应。

5. Promise在resolve之后再抛出错误，不会被捕获，等于没有抛出。因为promise的状态一旦改变就不会再变了。

### Promise.resolve()

用于将参数转化为一个promise对象

1. 参数是一个promise实例：原封不动地返回这个实例

2. 参数是一个thenable对象

   > thenable对象指的是具有then方法的对象

   ```javascript
   let thenable = {
       then(resolve, reject) {
           resolve(42);
       }
   }
   let p1 = Promise.resolve(thenable)
   p1.then(value => {
       // thenable的then执行后，p1立即变成resolved状态
       console.log(value) // 42
   })
   ```

   此时会把该对象转化为promise对象，并且立即执行then方法。

3. 参数不是具有then方法的对象，或者根本不是对象

   返回一个新的Promise对象，状态为resolved

   ```javascript
   const p = Promise.resolve('Hello');
   
   p.then(function (s){
     console.log(s)
   });
   // Hello
   
   ```

   > 因为字符串Hello不属于异步操作，所以p的状态从一生成就是resolved

4. 不带任何参数

   直接返回一个resolved状态的Promise对象。

   > 这个方法可以用于快速得到一个Promise对象

   ```javascript
   const p = Promise.resolve();
   
   p.then(function () {
     // ...
   });
   
   ```

   **注意这里立即resolved的Promise对象是在本轮事件循环的结束时，而不是在下轮事件循环的开始时**

   ```javascript
   setTimeout(function () {
     console.log('three');
   }, 0);
   
   Promise.resolve().then(function () {
     console.log('two');
   });
   
   console.log('one');
   
   // one
   // two
   // three
   ```

   

### 注意点

1. `Promise.all()`：以一个promise数组为输入，在数组中所有promise都成功返回后，返回一个新的promise。**是异步的for循环**
   * `Promise.all()`会把执行结果的数组返回到下一个函数，希望从db里取出多个对象时，非常有用。
   * 当数组中任意一个promise返回错误时，`Promise.all()`也会返回错误。
2. 记得使用`catch()`，不然抛出的异常无法捕获，**debug非常痛苦**



### 练习题

```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})

promise.then(res => {
  console.log(3)
})

console.log(4)
```

解释： promise的构造函数是同步的，then是异步的