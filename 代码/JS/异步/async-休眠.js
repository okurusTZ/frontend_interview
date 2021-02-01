function sleepInterval(interval) {
  return new Promise((resolve) => {
    // console.log(resolve);
    // 如果没有使用resolve，那么状态一直是pending，因此await不会返回
    setTimeout(resolve, interval);
  })
}

async function one2Five() {
  for(let i = 0; i < 5; i++) {
    console.log('第' + i +'次睡眠开始了');
    await sleepInterval(2000);
  }
}

one2Five()