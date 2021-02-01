class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }

  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(() => {
      resolve(Date.now() - startTime)
    }, this.timeout);
  }
}

( async () => {
  // 此处await后面对应的是一个Sleep的实例对象
  // 但因为实现了then方法，所以视为Promise来处理
  const sleepTime = await new Sleep(500);
  console.log(sleepTime);
})()