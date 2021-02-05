var time = new Date()
setTimeout(() => {
  console.log(new Date() - time);
}, 100);
// 这里的100实际上是执行时间的下限，可能会被系统调度或者其他回调函数的执行所推迟。


// 执行顺序受到机器影响，如果机器性能一般， 进入timer的时候，100Ms已经过去
// 这里是100ms是因为timer的时间下限是1ms，所以率先执行timer
// 而如果没有到，那么经过poll阶段后，已经有了setImmediate()的回调函数
// 会先执行setImmediate()的回调
setTimeout(() => {
  console.log('time out');
}, 0);

setImmediate(() => {
  console.log('immediate');
})

// 如果在readFile的回调函数里执行这两个
// 那么一定是setImmediate的回调函数先执行，因为readFile的回调是在poll阶段
// 执行的，因此下一步会先进入check


// 如果被一个异步操作包裹，那么setImmediate先执行

setTimeout(() => {
  // 外层执行结束时，离开timer阶段
  // 先执行同步代码
  console.log('timeout0');
  // 执行微任务部分(在阶段之间执行)
  process.nextTick(() => {
      console.log('nextTick1');
      process.nextTick(() => {
          console.log('nextTick2');
      });
  });
  process.nextTick(() => {
      console.log('nextTick3');
  });
  // 同步代码
  console.log('sync');
  // 最后进入下一个循环,再次进入timer
  setTimeout(() => {
      console.log('timeout2');
  }, 0);
}, 0);