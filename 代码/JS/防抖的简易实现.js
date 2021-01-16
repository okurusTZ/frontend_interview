// func: 执行的时间
// wait：等待的时间

function rebounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const arg = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait);
  }
}