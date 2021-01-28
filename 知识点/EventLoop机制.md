EventLoop是计算机系统的一种运行机制。JS主要用于解决单线程运行带来的一些问题，也就是**异步**的原理



一般情况下，一个进程只能执行一个任务。如果有很多任务需要执行，不外乎三种解决方法。

1. 排队。等前面的任务执行完，再执行后面的任务。
2. 新建进程。使用fork命令，为每个任务新建一个进程。
3. 新建线程。进程太耗费资源，所以程序允许一个进程包含多个线程，由线程去完成任务。

而Javascript是一种单线程语言，采用的是第一种方法。



#### 浏览器中的EventLoop

JS中有一个main thread和一个call-stack，所有的任务都会被放到call-stack等待main thread执行。

##### JS调用栈

后进先出，函数执行的时候，会被添加到栈的顶部，执行完成之后，会从栈顶移除，直到栈被清空。

##### 同步任务和异步任务

同步任务在调用栈内按照顺序等待主线程依次执行，异步任务会在异步任务有结果后，将注册的回调函数放入**任务队列**等待主线程空闲时执行（调用栈被清空），被读取到站内等待主线程执行。

> 任务队列，先进先出的数据结构

![preview](https://pic3.zhimg.com/v2-971a09fea16fff72db03d498245bc892_r.jpg)



##### 进程模型

* 在此次tick中选择最先进入队列的任务（oldest task），如果有就执行
* 检查是否存在**Microtasks**，如果存在则不停执行，直到清空Microtask queue
* 更新render
* 主线程重复上述步骤



##### 事件循环的原理

执行栈在执行完同步任务之后，查看执行栈是否为空，如果执行栈为空，就去（事件队列查看是否有任务，主线程取出排在第一位的事件，把其对应的回调放入执行栈，执行其中的同步代码）执行宏任务，每次宏任务执行完后，检查微任务队列是否为空，如果不为空的话，按照先入先出原则循环执行完所有微任务，设置微任务队列为空，然后再执行宏任务，如此循环。

![preview](https://pic4.zhimg.com/v2-da078fa3eadf3db4bf455904ae06f84b_r.jpg)

#### 宏任务&微任务

因为异步任务之间并不相同，执行的优先顺序也有区别，所以被分为两类。分别放到不同的时间队列里去。

在当前执行栈为空的时候，主线程会查看微任务队列是否有事件存在。

* 如果没有，再去宏任务队列中取出一个事件并将其回调加入到当前执行栈。
* 如果存在，则会依次执行队列中事件对应的回调，直到微任务队列为空，再去宏任务队列取出最前面的事件
* ...如此循环
* 

**所以当前执行栈执行完毕时，会立刻先处理所有微任务队列中的事件，再去宏任务队列取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。**



##### 宏任务

* script的全部代码、setTimeout、setInterval、setImmediate、I/O、UI Rendering

##### 微任务

* process.nextTick、Promise、Object.observe、MutationObserver



#### 举例

```javascript
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');
```

##### 第一次执行

```js
Tasks：run script、 setTimeout callback

Microtasks：Promise then	

// 此时正在执行的是整个script的宏任务
JS stack: script	
Log: script start、script end。
```

##### 第二次执行

```js
Tasks：run script、 setTimeout callback

Microtasks：Promise2 then	

JS stack: Promise2 callback	
Log: script start、script end、promise1、promise2
```

执行宏任务之后，发现微任务不为空，执行Promise1，执行完Promise1后，then调用promise2.then，放入微任务队列中，再执行promise2.then

##### 第三次执行

```js
Tasks：setTimeout callback

Microtasks：	

JS stack: setTimeout callback
Log: script start、script end、promise1、promise2、setTimeout
```

##### 第四次执行

```js
Tasks：setTimeout callback

Microtasks：	

JS stack: 
Log: script start、script end、promise1、promise2、setTimeout
```

微任务为空，执行宏任务，执行setTimeout callback

> 这里第一次执行的宏任务是script的全部代码
>
> 最终输出：script start、script end、promise1、promise2、setTimeout

